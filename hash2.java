import java.util.Scanner;

public class hash2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String s = sc.nextLine();

        int hash = 0;
        for (char c : s.toCharArray()) {
            hash += c;
        }

        System.out.println("Hash: " + hash);
        sc.close();
    }
}
