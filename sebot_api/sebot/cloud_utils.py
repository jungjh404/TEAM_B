#!/usr/bin/env python3
# _*_ coding: utf-8 _*_

from datetime import datetime
import boto3

from config import CLOUD

class Cloud:
    def __init__(self):
        self.s3 = boto3.client('s3',
                    aws_access_key_id = CLOUD['AWS_ACCESS_KEY'],
                    aws_secret_access_key = CLOUD['AWS_SECRET_KEY'])


    def upload_image(self, image):
        try:
            file_name = f'{datetime.now().strftime("%Y-%m-%d %H:%M:%S:%06m")}.jpeg'
            self.s3.put_object(
                Bucket = CLOUD['BUCKET_NAME'],
                Body = image,
                Key = file_name,
                ContentType = 'image/jpeg'
            )
            return file_name, True

        except Exception as e:
            return None, False

