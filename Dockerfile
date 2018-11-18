FROM centos:7.5.1804

ENV APP_HOME=/opt/thumbnail/
WORKDIR $APP_HOME

RUN curl -sL https://rpm.nodesource.com/setup_11.x | bash - \
 && yum -y install nodejs

COPY ./*.js ./*.json $APP_HOME
RUN npm install --production

RUN echo "#!/bin/bash" > run.sh \
 && echo "sleep 30 && node app.js" >> run.sh \
 && chmod 700 run.sh
	
CMD ["./run.sh"]
