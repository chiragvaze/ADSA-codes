#include <stdio.h>
#include <stdlib.h>

#define MAX 100

int front = -1, rear = -1;
int queue[MAX];

// Circular queue enqueue
void enqueue(int vertex) {
    if ((rear + 1) % MAX == front) {
        printf("Queue is Full\n");
        return;
    }
    if (front == -1) {
        front = rear = 0;
    } else {
        rear = (rear + 1) % MAX;
    }
    queue[rear] = vertex;
}

// Circular queue dequeue
int dequeue() {
    if (front == -1) {
        return -1;
    }
    int vertex = queue[front];
    if (front == rear) {
        front = rear = -1;
    } else {
        front = (front + 1) % MAX;
    }
    return vertex;
}

// BFS Traversal
void BFS(int **graph, int vertices, int start_vertex) {
    int *visited = (int *)calloc(vertices, sizeof(int));
    if (!visited) {
        printf("Memory allocation failed.\n");
        return;
    }

    enqueue(start_vertex);
    visited[start_vertex] = 1;

    printf("BFS Traversal: ");
    while (front != -1) {
        int current_vertex = dequeue();
        printf("%d ", current_vertex);

        for (int i = 0; i < vertices; i++) {
            // Accept any non-zero value as an edge (supports weighted graphs)
            if (graph[current_vertex][i] != 0 && !visited[i]) {
                enqueue(i);
                visited[i] = 1;
            }
        }
    }
    printf("\n");

    free(visited);
}

int main() {
    int vertices, start;

    printf("Enter the Number of Vertices (max %d): ", MAX);
    scanf("%d", &vertices);

    if (vertices <= 0 || vertices > MAX) {
        printf("Invalid number of vertices.\n");
        return 1;
    }

    // Allocate adjacency matrix
    int **graph = (int **)malloc(vertices * sizeof(int *));
    for (int i = 0; i < vertices; i++) {
        graph[i] = (int *)malloc(vertices * sizeof(int));
    }

    printf("Enter the Adjacency Matrix (%d x %d):\n", vertices, vertices);
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            scanf("%d", &graph[i][j]);
        }
    }

    printf("Enter the Starting Vertex (0 to %d): ", vertices - 1);
    scanf("%d", &start);

    if (start < 0 || start >= vertices) {
        printf("Invalid starting vertex.\n");
        // Free memory
        for (int i = 0; i < vertices; i++) {
            free(graph[i]);
        }
        free(graph);
        return 1;
    }

    BFS(graph, vertices, start);

    // Free memory
    for (int i = 0; i < vertices; i++) {
        free(graph[i]);
    }
    free(graph);

    return 0;
}
