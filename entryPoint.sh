#!/bin/sh
set -xe
: "${BACKEND_BASE_URL?BACKEND_BASE_URL is not defined}"
: "${BASE_NAME?BASE_NAME is not defined}"

sed -i 's|REACT_APP_SITE_TITLE:[^,]*|REACT_APP_SITE_TITLE: '\"$TITLE\"'|g' /dist/bundle.js
sed -i 's|ENV_BACKEND_BASE_URL:[^,]*|ENV_BACKEND_BASE_URL: '\"$BACKEND_BASE_URL\"'|g' /dist/bundle.js
sed -i 's|ENV_BACKEND_API_PATH:[^,]*|ENV_BACKEND_API_PATH: '\"$BACKEND_API_PATH\"'|g' /dist/bundle.js
sed -i 's|ENV_BASE_NAME:[^,]*|ENV_BASE_NAME: '\"$BASE_NAME\"'|g' /dist/bundle.js
sed -i 's|ENV_DICOM_VIEWER_PAGE:[^,]*|ENV_DICOM_VIEWER_PAGE: '\"$DICOM_VIEWER_PAGE\"'|g' /dist/bundle.js
sed -i 's|ENV_DICOM_SERVER_PATH:[^,]*|ENV_DICOM_SERVER_PATH: '\"$DICOM_SERVER_PATH\"'|g' /dist/bundle.js
sed -i 's|ENV_TIMEZONE_OFFSET:[^,]*|ENV_TIMEZONE_OFFSET: '\"$TIMEZONE_OFFSET\"'|g' /dist/bundle.js


exec "$@"