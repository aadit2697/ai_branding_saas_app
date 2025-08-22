# lambda_base_layer/Dockerfile
FROM public.ecr.aws/lambda/python:3.9

# install zip so we can package the layer
RUN yum install -y zip && yum clean all

# switch to /opt (Lambda will look here for layer.zip)
WORKDIR /opt

# copy only what we need
COPY requirements.txt .

# install all deps into python/ (the Lambda‑layer layout)
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt -t python

# zip up the python/ folder into layer.zip
RUN zip -r layer.zip python

ENTRYPOINT ["/bin/bash","-l"]
