FROM node:12

RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 --assume-yes

USER root

# install Chromebrowser
RUN \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
    apt-get update && \
    apt-get install -y dbus-x11 google-chrome-stable google-chrome-beta && \
    rm -rf /var/lib/apt/lists/*

# versions of local tools
RUN node -v
RUN yarn -v
RUN google-chrome --version
RUN google-chrome-beta --version

# good colors for most applications
ENV TERM xterm

WORKDIR /trezor-suite
RUN git clone git@github.com:trezor/trezor-suite.git
RUN cd trezor-suite/
RUN yarn
