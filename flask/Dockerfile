# flask/Dockerfile
FROM python:3.12
WORKDIR /app
RUN pip install flask
RUN pip install requests
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]