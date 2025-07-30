import java.util.Scanner;

public class hash4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);  
        System.out.print("Enter a string: ");
        String s = sc.nextLine();           

        int h = 0;                             
        for (int i = 0; i < s.length(); i++) {
            h += s.charAt(i);                 
        }

        System.out.println("Hash: " + h);     
    }

}
