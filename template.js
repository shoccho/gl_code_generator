var part1 = `
#include <GL/gl.h>
#include <GL/glu.h>
#include <GL/glut.h>
#include <stdlib.h>
#include <math.h>
#define twicePi 6.28318

void drawFilledelipse(GLfloat x, GLfloat y, GLfloat xcenter, GLfloat ycenter)
{

    int triangleAmount = 100;
    glBegin(GL_TRIANGLE_FAN);
    glVertex2f(x, y);
    for (int i = 0; i <= triangleAmount; i++)
    {
        glVertex2f(
            x + ((xcenter)*cos(i * twicePi / triangleAmount)),
            y + ((ycenter)*sin(i * twicePi / triangleAmount)));
    }
    glEnd();
}

void init()
{
    glClearColor(1.0f, 1.0f, 1.0f, 1.0f);
    gluOrtho2D(0, 500, 500, 0);
}
static void display(void)
{
    glClear(GL_COLOR_BUFFER_BIT);
    `;

var part2 = `
    glFlush();
}
int main(int argc, char **argv)
{
    glutInit(&argc, argv);
    glutInitWindowSize(500, 500);
    glutInitWindowPosition(100, 100);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutCreateWindow("sketch");
    init();
    glutDisplayFunc(display);
    glutMainLoop();

    return EXIT_SUCCESS;
}`;
