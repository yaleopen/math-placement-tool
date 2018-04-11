FROM openjdk:8
MAINTAINER Ismail Orabi "ismail.orabi@yale.edu"

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends apt-utils
# install aws-cli
RUN apt-get install -y python-minimal gettext-base && \
    wget -nv "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" && \
    unzip awscli-bundle.zip && \
    ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws

WORKDIR /usr/lib/java

ENV GRAILS_VERSION 3.3.4

RUN wget https://github.com/grails/grails-core/releases/download/v${GRAILS_VERSION}/grails-${GRAILS_VERSION}.zip && \
    unzip grails-${GRAILS_VERSION}.zip && \
    rm -rf grails-${GRAILS_VERSION}.zip && \
    ln -s grails-${GRAILS_VERSION} grails

ENV GRAILS_HOME /usr/lib/java/grails
ENV PATH $GRAILS_HOME/bin:$PATH

EXPOSE 8080
WORKDIR /app
COPY . /app
RUN grails package

CMD ["java","-Djava.security.egd=file:/dev/./urandom", "-Dgrails.env=dev", "-jar","/app/build/libs/math-placement-tool-0.1.war"]