# Legacy OpenGL code generator

The main idea of this project is to enable the user to draw shapes using the basic shapes editor and have somesort of  legacy opengl code generated for the sketch

this tool can be used to understand and make basic shapes for computer graphics course in universities where they teach using legacy opengl and glut/freeglut


# Usage

The generated code can be compiled using  

## Linux

 `gcc -lGL -lGLU -lglut `


## Windows

 - compiling

  `gcc -c main.cpp -std=c++14 -O3 -Wall -m64 -D FREEGLUT_STATIC -I "PATH_TO_FREEGLUT/include"`

 - building

  `gcc main.o -o main -L "PATH_TO_FREEGLUT/lib/x64" -s -lfreeglut_static -lopengl32 -lglu32 -lgdi32 -lwinmm -Wl,--subsystem,windows`
  
  > if you are using MinGW-W64

  `gcc main.o -o main -L "PATH_TO_FREEGLUT/lib" -s -lfreeglut_static -lopengl32 -lglu32 -lgdi32 -lwinmm -Wl,--subsystem,windows`
  
  > if you are using MinGW


# Dependencies

 Linux
 
 - gcc
 
 - freeglut3-dev or freeglut

Windows

 - [MinGW-W64](https://www.mingw-w64.org/) / [MinGW](https://sourceforge.net/projects/mingw/)
 
 - [freeglut3](http://freeglut.sourceforge.net/index.php#download)

 
# Testing

Tested on Windows 10 with MinGW-W64 and freeglut3.0.0
Tested on various gnu+linux distributions with gcc and freeglut3 and freeglut3-dev

