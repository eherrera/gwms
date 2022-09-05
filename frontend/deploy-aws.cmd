# deploy cloudformation stack with s3 bucket and cloudfront distribution
- STACK_NAME=<STACK_NAME>
- APP_REGION=<APP_REGION_NAME>
- ARTIFACTS_BUCKET=<ARTIFACTS_BUCKET_NAME>
- sam package --template-file ./cloudformation/template.yml --output-template-file ./cloudformation/packaged.yml --s3-bucket $ARTIFACTS_BUCKET
- sam deploy --no-fail-on-empty-changeset --region $APP_REGION --template-file ./cloudformation/packaged.yml --stack-name $STACK_NAME --s3-bucket $ARTIFACTS_BUCKET --capabilities CAPABILITY_NAMED_IAM --parameter-overrides GWMSSiteS3BucketName=$BUCKET_NAME

# deploy files to bucket and invalidate cloudfront distribution
- npm run build
- aws s3 cp dist/ s3://$BUCKET_NAME/ --recursive --include "*" --exclude "*.html" --acl public-read --metadata-directive REPLACE --cache-control 'max-age=31536000'
- aws s3 cp dist/ s3://$BUCKET_NAME/ --recursive --exclude "*" --include "*.html" --acl public-read
- aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
