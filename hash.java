import java.util.*;

public class Hash {

    public static void hash(String name, int size){

        int sum = 0;

        for(int i = 0; i<name.length(); i++){

            int ascii = name.charAt(i);

            sum +=ascii;

        }

        int pos = sum%size;

        System.out.println("ASII Sum = "+sum);

        System.out.println("Hash Position is "+pos);

    }

    public static void main(String[] args){

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter the Name: ");

        String name = sc.nextLine();

        System.out.print("Enter the Size of Hash Table: ");

        int size = sc.nextInt();

        if(size<=0){

            System.out.println("The Size of Hash Table Must be Greater Than 0");

        }

        else {

            hash(name, size);

        }

        sc.close();

    }

}
