* Cài các lệnh sau vào terminal:
    ```
    sudo apt install dirmngr gnupg apt-transport-https ca-certificates software-properties-common
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
    sudo add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu focal-cran40/'
    sudo apt install r-base
    sudo apt install build-essential
    pip3 install jupyterlab
    pip3 install zmq
    jupyter labextension install @techrah/text-shortcuts
    ```

* Ghõ lệnh `R` vào terminal, sau đó bỏ các dòng này vào:
    ```r
    install.packages('IRkernel')  # Don’t forget step 2/3!
    IRkernel::installspec()

    install.packages("ggExtra")
    install.packages("installr")
    install.packages("table1")
    install.packages('compareGroups')
    install.packages('DescTools')
    install.packages("tidyverse")
    install.packages("ggplot2")
    install.packages('BMA')
    install.packages("xlsx")
    install.packages("XML")
    install.packages("httr")
    install.packages("jsonlite")
    install.packages("GGally")
    install.packages("gridExtra")
    install.packages("moments")
    install.packages("mlbench")
    install.packages("e1071")
    install.packages("corrplot")
    install.packages("forecast")
    install.packages('relaimpo')
    install.packages("rpart")
    install.packages("rpart.plot")
    install.packages("factoextra")
    install.packages("cluster")

    install.packages(c('repr', 'IRdisplay', 'evaluate', 'crayon', 'pbdZMQ', 'devtools', 'uuid', 'digest'))
    install.packages(c('rzmq','repr','IRkernel','IRdisplay'),
                    repos = c('http://irkernel.github.io/', 
                            getOption('repos')), 
                    type = 'source')
    devtools::install_github('IRkernel/IRkernel')
    IRkernel::installspec()
    ```

