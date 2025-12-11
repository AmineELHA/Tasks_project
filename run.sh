#!/bin/bash

# Script to run Task Manager backend with Java 17
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH

echo "Using Java version:"
java -version

echo ""
echo "Starting Task Manager backend on port 8080..."
echo "Login credentials: admin@demo.com / 123456"
echo ""

mvn spring-boot:run
