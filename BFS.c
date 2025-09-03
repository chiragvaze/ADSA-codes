#include<stdio.h>
#include<stdlib.h>
#define MAX 10
int queue[MAX];
int front = -1;
int rear = -1;
int visited[MAX];
void enqueue(int vertex){
    if(rear == MAX-1){
        printf("Queue is Full\n");
        return;
    }
    if(front == -1){
        front = 0;
    }
    rear = rear + 1;
    queue[rear] = vertex;
}
int dequeue(){
    if(front == -1){
        return -1;
    }
    int vertex = queue[front];
    if (front >= rear){
        front = -1;
        rear = -1;
    }
    else {
        front = front + 1;
    }
    return vertex;
}
void BFS(int graph[MAX][MAX],int vertices, int start_vertex){
    for(int i = 0; i<vertices; i++){
        visited[i] = 0;
    }
    enqueue(start_vertex);
    visited[start_vertex] = 1;
    printf("BFS Traversal: ");
    while(front !=-1){
        int current_vertex = dequeue();
        printf("%d ", current_vertex);
    for(int i = 0; i<vertices; i++){
        if(graph[current_vertex][i] == 1 && visited[i] == 0){
            enqueue(i);
            visited[i] = 1;
            }
        }
    }
    printf("\n");
}

int main(){
    int vertices,start;
    int graph[MAX][MAX];
    printf("Enter the Number of Vertices: ");
    scanf("%d",&vertices);
    printf("Enter the Adjacency Matrix(%d x %d):\n",vertices,vertices);
    for(int i = 0; i<vertices; i++){
        for(int j = 0; j<vertices; j++){
            scanf("%d",&graph[i][j]);
        }
    }
    printf("Enter the Starting Vertex: ");
    scanf("%d",&start);
    BFS(graph,vertices,start);
    return 0;
}
