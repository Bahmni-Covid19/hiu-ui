#!/bin/sh
set -xe
: "${BACKEND_BASE_URL?Need an api url}"

sed -i 's|\<TITLE\>|'$TITLE'|g' /dist/bundle.js
sed -i 's|\<BACKEND_BASE_URL\>|'$BACKEND_BASE_URL'|g' /dist/bundle.js
sed -i 's|\<BACKEND_API_PATH\>|'$BACKEND_API_PATH'|g' /dist/bundle.js
sed -i 's|\<BASE_NAME\>|'$BASE_NAME'|g' /dist/bundle.js
sed -i 's|\<DICOM_VIEWER_PAGE\>|'$DICOM_VIEWER_PAGE'|g' /dist/bundle.js
sed -i 's|\<DICOM_SERVER_PATH\>|'$DICOM_SERVER_PATH'|g' /dist/bundle.js
sed -i 's|\<TIMEZONE_OFFSET\>|'$TIMEZONE_OFFSET'|g' /dist/bundle.js


exec "$@"