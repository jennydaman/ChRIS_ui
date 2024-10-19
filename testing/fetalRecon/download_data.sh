#!/usr/bin/env bash
# Downloads a dataset of dummy DICOM files into a subdirectory of testing/sample_dicoms/data,
# which later gets uploaded to Orthanc by `pnpm run get-dicoms`.
#
# The dataset has metadata resembling an in-utero MRI, but contains no pixel data.

path="$(pnpm prefix)/testing/sample_dicoms/data/in-utero-fetal-brain-mri-dummy"
url=https://github.com/user-attachments/files/17442096/mri_in_utero_neuro_dummy_dicoms.tar.gz

set -o pipefail
set -ex

if ! [ -e "$path" ]; then
  mkdir -p "$path"
  curl -sSfL "$url" | tar xz --directory="$path"
fi
