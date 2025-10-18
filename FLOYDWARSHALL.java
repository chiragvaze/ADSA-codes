import java.util.*;
public class FLOYDWARSHALL 
{
static final int INF = 100000000; // A large value 
representing infinity
static void floydWarshall(int[][] dist) 
{
int V = dist.length;
for (int k = 0; k < V; k++) 
{
for (int i = 0; i < V; i++) 
{
for (int j = 0; j < V; j++) 
{
if (dist[i][k] != INF && dist[k][j] != 
INF)
dist[i][j] = Math.min(dist[i][j], 
dist[i][k] + dist[k][j]);
}
}
}
}
public static void main(String[] args) 
{
Scanner sc = new Scanner(System.in);
System.out.print("Enter the number of vertices: ");
int V = sc.nextInt();
int[][] dist = new int[V][V];
System.out.println("\nEnter the adjacency matrix:");
for (int i = 0; i < V; i++) 
{
for (int j = 0; j < V; j++) 
{
dist[i][j] = sc.nextInt();
}
}
//Apply Floyd–Warshall algorithm
floydWarshall(dist);
System.out.println("\nShortest distance matrix:");
for (int i = 0; i < V; i++) 
{
for (int j = 0; j < V; j++) 
{
if (dist[i][j] == INF)
System.out.print("INF ");
else
System.out.print(dist[i][j] + " ");
}
System.out.println();
}
sc.close();
}
}