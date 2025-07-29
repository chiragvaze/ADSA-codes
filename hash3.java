import java.util.Scanner;

public class hash3 {

    // Custom hash function for a string
    public static int hash(String input) {
        int hash = 0;
        int prime = 31; // A small prime number

        for (int i = 0; i < input.length(); i++) {
            hash = hash * prime + input.charAt(i);
        }

        return Math.abs(hash); // Return non-negative hash value
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); // Scanner to take user input

        System.out.print("Enter a string: ");
        String userInput = scanner.nextLine(); // Read user input

        int hashValue = hash(userInput); // Compute hash
        System.out.println("Custom hash value: " + hashValue);

        scanner.close(); // Close the scanner
    }
}
