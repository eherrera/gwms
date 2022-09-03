#!/bin/bash

if [ "$1" == "" ]
then
    echo "ERROR: You most provide the Stack name as argument."
    exit 1
fi

if [ "$2" == "" ]
then
    echo "ERROR: You most provide the Stack region as argument."
    exit 1
fi

resources=`aws cloudformation list-stack-resources --stack-name $1 --region $2 | jq -c '.StackResourceSummaries'`
flag=true
index=0
distributionId=""

while [ $flag == true ]
do
    item=`echo $resources | jq -c '.['$index']'`
    if [ "$item" == "null" ]
    then
        flag=false
    else
        logicalResourceId=`echo $item | jq -c '.ResourceType' | cut -d '"' -f 2`
        if [ "$logicalResourceId" == "AWS::CloudFront::Distribution" ]
        then
            distributionId=`echo $item | jq -c '.PhysicalResourceId'`
            flag=false
        fi
        index=$index+1
    fi            
done

distributionId=`echo $distributionId | cut -d '"' -f 2`
echo $distributionId

exit 0
