import java.util.*;
public class cycle 
{
// Function to check if the vertex can be placed at current 
position
static boolean isSafe(int vertex, int[][] graph, int[] path, int 
pos)
{
// The vertex must be adjacent to the previous vertex in the 
path
if (graph[path[pos - 1]][vertex] == 0) {
return false;
}
// The vertex must not already be included in the path
for (int i = 0; i < pos; i++) 
 {
if (path[i] == vertex) 
 {
return false;
}
}
return true;
}
// Recursive utility function to construct Hamiltonian cycle
static boolean hamCycleUtil(int[][] graph, int[] path, int pos, 
int n) 
 {
// Base case: all vertices are included in the path
if (pos == n) 
 {
// Check if there is an edge from the last vertex to the 
first
return graph[path[pos - 1]][path[0]] == 1;
}
// Try different vertices as the next candidate
for (int v = 1; v < n; v++) 
 {
if (isSafe(v, graph, path, pos)) 
 {
path[pos] = v;
if (hamCycleUtil(graph, path, pos + 1, n)) 
 {
return true;
}
// Backtrack
path[pos] = -1;
}
}
return false;
}
// Function to initialize path and find the Hamiltonian cycle
static int[] hamCycle(int[][] graph)
 {
int n = graph.length;
int[] path = new int[n];
Arrays.fill(path, -1);
path[0] = 0; // Start from vertex 0
if (!hamCycleUtil(graph, path, 1, n))
 {
return new int[]{-1}; // No cycle found
}
return path;
}
// Main function (Driver Code)
public static void main(String[] args) 
 {
Scanner sc = new Scanner(System.in);
System.out.print("Enter the number of vertices: ");
int V = sc.nextInt();
int[][] graph = new int[V][V];
System.out.println("\nEnter the adjacency matrix (use 0 for 
no edge, 1 for edge):");
for (int i = 0; i < V; i++) 
 {
for (int j = 0; j < V; j++)
 {
graph[i][j] = sc.nextInt();
}
}
int[] path = hamCycle(graph);
System.out.println("\nResult:");
if (path[0] == -1)
 {
System.out.println("No Hamiltonian Cycle exists for this 
graph.");
}
else
 {
System.out.println(" Hamiltonian Cycle found: ");
for (int i = 0; i < path.length; i++) {
System.out.print(path[i] + " ");
}
System.out.println(path[0]); // to complete the cycle
}
sc.close();
}
}
