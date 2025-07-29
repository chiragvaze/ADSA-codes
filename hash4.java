import java.util.Scanner;

public class hash4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);  // for user input
        System.out.print("Enter a string: ");
        String s = sc.nextLine();             // take input from user

        int h = 0;                             // hash value
        for (int i = 0; i < s.length(); i++) {
            h += s.charAt(i);                 // add ASCII value of each character
        }

        System.out.println("Hash: " + h);     // print result
    }

}
