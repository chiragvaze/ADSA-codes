import java.util.Scanner;

public class Dijkstra {

    // Function to find the vertex with minimum distance that has not been visited yet
    static int FindMinDistance(int[] dist, boolean[] visited, int n) {
        int min = Integer.MAX_VALUE; // Initialize min distance as infinity
        int min_index = -1;          // Initialize index of the vertex with min distance

        // Traverse all vertices to find the unvisited vertex with the smallest distance
        for (int v = 0; v < n; v++) {
            if (!visited[v] && dist[v] < min) {
                min = dist[v];
                min_index = v;
            }
        }

        return min_index; // Return the index of the vertex with minimum distance
    }

    // Function to perform Dijkstra's algorithm
    static void dijkstraAlgo(int[][] graph, int src, int n) {
        int[] dist = new int[n];          // Array to store shortest distances from source
        boolean[] visited = new boolean[n]; // visited[i] is true if vertex i is processed

        // Initialize distances to infinity and visited[] to false
        for (int i = 0; i < n; i++) {
            dist[i] = Integer.MAX_VALUE;
            visited[i] = false;
        }

        dist[src] = 0; // Distance to source vertex is 0

        // Process all vertices
        for (int count = 0; count < n - 1; count++) {
            // Pick the unvisited vertex with the minimum distance
            int u = FindMinDistance(dist, visited, n);
            visited[u] = true; // Mark the picked vertex as visited

            // Update distance of adjacent vertices of the picked vertex
            for (int v = 0; v < n; v++) {
                // Conditions to update dist[v]:
                // 1. Vertex v is not yet visited
                // 2. There is an edge from u to v (graph[u][v] != 0)
                // 3. Distance to v through u is smaller than current distance
                if (!visited[v] && graph[u][v] != 0 &&
                        dist[u] != Integer.MAX_VALUE &&
                        dist[u] + graph[u][v] < dist[v]) {

                    dist[v] = dist[u] + graph[u][v]; // Update distance of vertex v
                }
            }
        }

        // Print the final shortest distances from the source
        PrintDistances(dist, src, n);
    }

    // Function to print the shortest distances from the source vertex
    static void PrintDistances(int[] dist, int src, int n) {
        System.out.println("Vertex\tDistance from Source " + src);
        for (int i = 0; i < n; i++) {
            System.out.println(i + "\t\t" + dist[i]);
        }
    }

    // Main function
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Input the number of vertices in the graph
        System.out.print("Enter the number of vertices: ");
        int n = sc.nextInt();

        // Input adjacency matrix of the graph
        int[][] graph = new int[n][n];
        System.out.printf("Enter the adjacency matrix (%dx%d):\n", n, n);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                graph[i][j] = sc.nextInt();
            }
        }

        // Input source vertex from which shortest distances are calculated
        System.out.print("Enter the source vertex: ");
        int src = sc.nextInt();

        // Run Dijkstra's algorithm
        dijkstraAlgo(graph, src, n);

        sc.close(); // Close the scanner
    }
}
