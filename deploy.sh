#!/bin/bash
set -e 

echo "beginning build process"

ENV=$1

if [ $ENV == "dev" ]; then
    DIST=E2GRDGFBQ38J86
else
    DIST=E3HHE4HP52X0W0
fi

rm -rf build/*

env-cmd -f .env.$ENV npm run build
aws s3 sync ./build s3://$ENV-blog-infra-frontend

aws cloudfront create-invalidation --distribution-id $DIST --paths "/*"

echo "done"