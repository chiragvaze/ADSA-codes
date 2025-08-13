#include <stdio.h>
#include <stdlib.h>

#define MAX 100

int queue[MAX];
int front = -1;
int rear = -1;
int visited[MAX];
int graph[MAX][MAX];

// Enqueue function
void enqueue(int value) {
    if (rear == MAX - 1) {
        printf("Queue is full\n");
        return;
    }
    if (front == -1) {
        front = 0;
    }
    queue[++rear] = value;
}

// Dequeue function
int dequeue() {
    if (front == -1 || front > rear) {
        return -1;
    }
    int value = queue[front++];
    if (front > rear) {
        front = rear = -1;
    }
    return value;
}

// Check if queue is empty
int isEmpty() {
    return (front == -1 || front > rear);
}

// BFS Traversal Function
void BFS(int startvertex, int vertices) {
    for (int i = 0; i < vertices; i++) {
        visited[i] = 0;
    }

    enqueue(startvertex);
    visited[startvertex] = 1;

    while (!isEmpty()) {
        int currentvertex = dequeue();
        printf("Visited Vertex: %d\n", currentvertex);

        for (int i = 0; i < vertices; i++) {
            if (graph[currentvertex][i] == 1 && visited[i] == 0) {
                enqueue(i);
                visited[i] = 1;
            }
        }
    }
}

int main() {
    int vertices, startvertex;

    printf("Enter the number of vertices: ");
    scanf("%d", &vertices);

    printf("Enter the adjacency matrix:\n");
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            scanf("%d", &graph[i][j]);
        }
    }

    printf("Enter the starting vertex for BFS: ");
    scanf("%d", &startvertex);

    printf("BFS Traversal:\n");
    BFS(startvertex, vertices);

    return 0;
}
