FROM python:3.8-slim

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv && \
  apt-get update && \
  apt-get install -y --no-install-recommends gcc python3-dev libssl-dev && \
  pipenv install --deploy --system && \
  apt-get remove -y gcc python3-dev libssl-dev && \
  apt-get autoremove -y && \
  pip uninstall pipenv -y

COPY . ./

VOLUME /app/db

ENTRYPOINT [ "python", "main.py" ]
# No CMD because the image must be used as interactive :
# docker run -it your_image_name
