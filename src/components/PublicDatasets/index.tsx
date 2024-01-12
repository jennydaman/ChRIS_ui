import WrapperConnect from "../Wrapper";
import {
  Alert,
  Breadcrumb,
  BreadcrumbItem, Dropdown, DropdownItem, DropdownList, MenuToggle, MenuToggleElement,
  PageBreadcrumb,
  PageGroup,
  PageNavigation,
  PageSection, Progress, ProgressVariant
} from "@patternfly/react-core";
import { InfoIcon } from "../Common";
import { Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Collection, Feed, FeedFile } from "@fnndsc/chrisapi";
import ChrisAPIClient from "../../api/chrisapiclient.ts";
import { basename, filestemOf, groupBySubject, PublicDatasetFile, Subject } from "./subjects.ts";
import {NiivueCanvas, NVROptions, NVRVolume} from "niivue-react/src/index";
import {Niivue} from "@niivue/niivue";
import {useImmer} from "use-immer";
import styles from './styles.module.css';
import { setSidebarActive } from "../../store/ui/actions.ts";
import { useDispatch } from "react-redux";

const MAGIC_PUBLIC_DATASET_FILENAME = '.is.chris.publicdataset';

const _NIIVUE = new Niivue();
const NIIVUE_COLORMAPS = _NIIVUE.colormaps();

const DEFAULT_COLORMAPS_MAP = {
  cortex: 'gray',
  csf: 'gray',
  hemispheres: 'gray',
  mask: 'gray',
  template: 'gray',
  ventricles: 'red'
}

/**
 * https://github.com/FNNDSC/fnndsc/blob/26f4345a99c4486faedb732afe16fc1f14265d54/js/chrisAPI/src/feedfile.js#L38C1-L39
 */
function fileResourceUrlOf(file: FeedFile): string {
  const item = file.collection.items[0];
  return Collection.getLinkRelationUrls(item, 'file_resource')[0];
}

type Problem = {
  variant: "warning" | "success" | "danger" | "info"
  title: string,
  body?: React.ReactNode
};

type Files = {
  totalCount: number,
  items: PublicDatasetFile[]
}

type SelectedSubject = {
  subject: Subject,
  volumes: {[key: string]: VolumeOptions}
}

/**
 * A subset of `NVRVolume` but with non-optional keys.
 */
type VolumeOptions = {
  url: string,
  opacity: number,
  colormap: string
}

const PublicDatasets: React.FunctionComponent = () => {

  const client = ChrisAPIClient.getClient();
  const dispatch = useDispatch();
  const [feeds, setFeeds] = useState<Feed[] | null>(null);
  const [feed, setFeed] = useState<Feed | null>(null);
  const [feedFiles, setFeedFiles] = useState<Files | null>(null);
  const [giveupPagingFiles, setGiveupPagingFiles] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selected, setSelected] = useState<SelectedSubject | null>(null);

  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

  const subjects = feedFiles ? groupBySubject(feedFiles.items, MAGIC_PUBLIC_DATASET_FILENAME) : [];

  // HELPER FUNCTIONS
  // --------------------------------------------------------------------------------

  const pushProblem = (problem: Problem) => setProblems(problems.concat([problem]));

  const pushProblemOnce = (problem: Problem) => {
    if (problems.findIndex((other) => other.title === problem.title) === -1) {
      pushProblem(problem);
    }
  };

  const fetchFeedsContainingPublicDatasets = async () => {
    const searchParams = {
      files_fname_icontains: MAGIC_PUBLIC_DATASET_FILENAME,
      limit: 10
    };

    try {
      const feedsCollection = await client.getPublicFeeds(searchParams);

      if (feedsCollection.totalCount > 10) {
        pushProblemOnce({
          variant: 'warning',
          title: 'More than 10 feeds found.',
          body: 'Since pagination is not implemented yet, not all of them are shown.'
        });
      }

      // @ts-ignore
      setFeeds(feedsCollection.getItems());
    } catch (e) {
      pushProblem({
        variant: "danger",
        title: 'Could not load feeds.'
      });
      throw e;
    }
  };

  const fetchMoreFileUrlsIfNeeded = async (feed: Feed) => {
    if (feedFiles && feedFiles.items.length >= feedFiles.totalCount) {
      return;
    }

    try {
      setFeedFiles(await fetchNextFilesState(feed));
    } catch (e) {
      pushProblemOnce({
        variant: "danger",
        title: "Could not get file URLs",
        body: <pre>{e && typeof e === 'object' ? e.toString() : "unknown error"}</pre>
      })
      setGiveupPagingFiles(true);
      throw e;
    }
  };

  const fetchNextFilesState = async (feed: Feed): Promise<Files> => {
    const offset = feedFiles ? feedFiles.items.length : 0;
    const collection = await feed.getFiles({limit: 10, offset });
    const collectionItems = collection.getItems();

    if (collectionItems === null) {
      throw new Error(`could not get files of feed id=${feed.data.id}: collection.getItems() -> null`);
    }

    const newItems: PublicDatasetFile[] = collectionItems.map((feedFile: FeedFile) => {
      return {
        ...feedFile.data,
        file_resource: fileResourceUrlOf(feedFile)
      }
    });
    const items = feedFiles ? feedFiles.items.concat(newItems) : newItems;
    const totalCount = collection.totalCount;
    return { totalCount, items };
  };

  const onSubjectDropdownSelect = (_e: any, value: string | number | undefined) => {
    const selectedSubject = subjects.find((subject) => subject.name === value);
    if (selectedSubject === undefined) {
      console.warn(`No subject found with name "${value}". THIS IS A BUG.`);
      return;
    }
    setSubject(selectedSubject);
    setIsSubjectDropdownOpen(false);
  };

  const setSubject = (subject: Subject) => {
    const volumeEntries = subject.files
      .filter((file) => file.fname.endsWith('.nii.gz'))
      .map(file2entry);
    if (volumeEntries.length > 0) {
      // set the "preferred" volume to be opaque, leave everything else transparent.
      // currently, the implementation is hard-coded to use the volume named as "template" as the "preferred"
      // volume because we're focused on the fetal atlas dataset browser. In the future, we should probably
      // get this from some kind of metadata, e.g. maybe `.is.chris.publicdataset` could be called
      // `.is.chris.publicdataset.json` instead with the contents `{"preferred_volume": "template"}`
      const i = volumeEntries.findIndex(([name, _vo]) => name.includes('template'));
      volumeEntries[i === -1 ? 0 : i][1].opacity = 1.0;
    }
    const volumes = Object.fromEntries(volumeEntries);
    setSelected({subject, volumes});
  };

  // EFFECTS
  // --------------------------------------------------------------------------------

  React.useEffect(() => {
    document.title = "Public Datasets Browser";
    dispatch(
      setSidebarActive({
        activeItem: "niivue",
      })
    );
  }, []);

  // on first load, get all the public feeds containing public datasets.
  useEffect(() => {
    fetchFeedsContainingPublicDatasets();
  }, []);

  // once feeds have been found, automatically select the first feed.
  useEffect(() => {
    if (feeds === null) {
      return;
    }
    if (feed === null) {
      if (feeds.length === 0) {
        pushProblemOnce({
          variant: "warning",
          title: 'No public datasets found.',
          body: (<span>
            To add a public dataset, follow these instructions:{' '}
            <a href="https://chrisproject.org/docs/public_dataset_browser" target="_blank">
              https://chrisproject.org/docs/public_dataset_browser
            </a>
          </span>)
        });
      } else {
        setFeed(feeds[0]);
        if (feeds.length > 1) {
          pushProblemOnce({
            variant: "warning",
            title: "Multiple feeds found",
            body: (<>
              <p>Found public datasets in the following feeds:</p>
              <pre>{JSON.stringify(feeds.map((feed) => feed.data.name))}</pre>
              <p>Currently it is not possible to show any other feed besides the first.</p>
            </>)
          });
        }
      }
    }
  }, [feeds]);

  // once a feed has been set, get all of its files.
  useEffect(() => {
    if (feed === null) {
      return;
    }
    fetchMoreFileUrlsIfNeeded(feed);
  }, [feed, feedFiles]);

  // if subjects are found and no subject has been selected yet, set the first subject as selected.
  useEffect(() => {
    if (selected === null && subjects.length > 0) {
      setSubject(subjects[0]);
    }
  }, [subjects]);

  // ELEMENT
  // --------------------------------------------------------------------------------

  return (
    <WrapperConnect>

      <PageSection>
        <InfoIcon
          title="Public Datasets"
          p1={
            <Typography>
              <p>
                Datasets found in public feeds can be visualized here using
                <a href="https://github.com/niivue/niivue" target="_blank" rel="noreferrer nofollow">Niivue</a>.
              </p>
              <p>
                For how to add data here, see the documentation:
                <a href="https://chrisproject.org/docs/public_dataset_viewer" target="_blank" rel="noreferrer nofollow">
                  https://chrisproject.org/docs/public_dataset_viewer
                </a>.
              </p>
            </Typography>
          }
        />
      </PageSection>

      {
        problems.length === 0 || (
          <PageSection>
            {
              problems.map(({ variant, title, body }) => (
                <Alert variant={variant} title={title} key={title}>{body}</Alert>
              ))
            }
          </PageSection>
        )
      }

      <PageGroup>
        <PageNavigation>
          <PageBreadcrumb>
            <Breadcrumb>
              { feed && <BreadcrumbItem>{feed.data.name}</BreadcrumbItem>}
              { subjects && selected &&
                <BreadcrumbItem>
                  <Dropdown
                    isOpen={isSubjectDropdownOpen}
                    onSelect={onSubjectDropdownSelect}
                    onOpenChange={(isOpen: boolean) => setIsSubjectDropdownOpen(isOpen)}

                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle ref={toggleRef} onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)} isExpanded={isSubjectDropdownOpen}>
                        {selected?.subject.name}
                      </MenuToggle>
                    )}
                    shouldFocusToggleOnSelect
                  >
                    <DropdownList>
                      {
                        subjects
                          .map((subject) => subject.name)
                          .sort()
                          .map((name) => <DropdownItem key={name} value={name}>{name}</DropdownItem>)
                      }
                    </DropdownList>
                  </Dropdown>
                </BreadcrumbItem>
              }
            </Breadcrumb>
          </PageBreadcrumb>
        </PageNavigation>
      </PageGroup>

      {
        // show progress bar of feed files pagination while loading
        feedFiles && feedFiles.items.length !== feedFiles.totalCount &&
        <PageSection>
          <Progress
            value={feedFiles.items.length}
            min={0}
            max={feedFiles.totalCount}
            variant={giveupPagingFiles ? ProgressVariant.danger : undefined}
          />
        </PageSection>
      }

      {
        selected &&
        <PageSection isFilled>
          <div className={styles.niivueContainer}>
            <NiivueCanvas volumes={Object.values(selected.volumes)} />
          </div>
        </PageSection>

      }
    </WrapperConnect>
  );
}

function file2entry(file: PublicDatasetFile): [string, VolumeOptions] {
  const name = basename(file.fname);
  // warning: hard-coded string ".nii.gz"
  const colormap = DEFAULT_COLORMAPS_MAP[filestemOf(name, '.nii.gz') as keyof typeof DEFAULT_COLORMAPS_MAP] || 'gray';
  return [name, {url: file.file_resource, opacity: 0.0, colormap}];
}

export default PublicDatasets;