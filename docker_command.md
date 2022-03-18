**Author**: Manh Cuong

|Description|Command|Attention|
|-|-|-|
|run a container from an image|`docker run <image name>`|This command is only done the first time, For the **subsequent execution** /những lần chạy tiếp theo/, the new container is created based on the same image.|
|run a docker container with specific version of image|`docker run <image name:version>`|`docker run redis:4.0`|
|run a docker container in the detached mode|`docker run -d <image name>`||
|docker run container with paremeter mapping to variables inside container|`docker run -i kodekloud/simple-prompt-docker`|Sometime, this command is not show contents inside print function. We can fix this issue by the command below.|
|run docker container with content inside print function|`docker run -it kodekloud/simple-prompt-docker`|The version of command can fix the issue of the above command.|
|PORT mapping|`docker run -p 80:5000 kodekloud/simple-webapp` - map PORT 5000 of docker container to free PORT 80 of Docker host.|We need to use this command because the port of web app inside the container is different to the PORT of Docker host. So we need to mapping PORT from docker container to a free PORT of Docker host.|
|Run a docker container with volume mapping|`docker run -v /opt/datadir:/var/lib/mysql mysql` - map the directory `/var/lib/mysql` from docker container to `/opt/datadir` of Docker host|Use this option when you need to map storage from container to Docker host|
|List all running containers|`docker ps`||
|To see all containers running or not|`docker ps -a`||
|To stop a running container|`docker stop <container id|container name>`||
|Remove a container|`docker rm <container id|container name>`|| 
|To see a list of available images and their sizes|`docker images`||
|To build your application as an image from **Dockerfile**|`docker build Dockerfile -t manhcuong/my-simple-app`||
|Push your image to Docker Hub|`docker push manhcuong/my-simple-app`||
|Remove images|`docker rmi <image id|image name>`|You must ensure that no containers are running which are based on these images. You must delete all dependent containers to be able to delete an image.|
|Download an image and not run a container|`docker pull <image name>`||
|Execute a command|`docker exec <container id|container name> <executed command series>`|`docker exec ubuntu_container cat /etc/hosts`|
|If you would like to attach back to the running container later|`docker attach <container id|container name>`||
|Show detailed docker container|`docker inspect <container id|container name>`||
|See the logs of docker container|`docker logs <container id|container name>`||

# A quick view Dockerfile
* Look at this file below, CAPITALIZE WORDS are called **instruction**.
* Remaining is **argument**.
```docker
<!-- Define what the base OS should be for this container. Every Docker image must be \\
 based of another image, either an OS or another image that was created before based on \\
  an OS. We can find official release of all OS on Docker Hub -->
FROM Ubuntu 

<!-- some configuration for underlying OS. At here, these lines are used to install \\
all dependencies of Ubuntu and Application -->
RUN apt-get update
RUN apt-get install python

RUN pip install flask
RUN pip install flask-mysql

<!-- Copy all files at the same location of Dockerfile to image -->
COPY . /opt/source-code

<!-- Define a environment variable FLASK_APP, it is run when this image was build as a Docker container -->
ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run
```

# Deep dive into `Instruction`
* `CMD` - commands that defines program that will be run within container when it starts
* `ENTRYPOINT` - a large **demerit** /điều đáng trách/ of `CMD` that we cannot modify the value of argument, suppose if we set CMD like this: `CMD ["sleep", "5"]`, your container will be delayed 5 seconds all the time, so in the modern programming, `sleep` would better be **dynamic**, and then, if we want to specific a new value for `sleep` parameter - we just set it a new value.

# Networking
* When you install Docker, it creates three networks automatically: **Bridge**, **none** và **host**.
* **Bridge** 0.8999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999is 