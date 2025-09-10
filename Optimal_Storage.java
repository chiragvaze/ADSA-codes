
import java.util.Scanner;
public class Optimal_Storage
{

    // function to sort array in ascending order
    public static void Sort(int arr[])
    {
        for (int i = 0; i < arr.length; i++)
        {
            for (int j = 0; j < arr.length - 1 - i; j++)
            {
                // swap if current element is bigger than next
                if (arr[j] > arr[j + 1])
                {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String args[])
    {
        Scanner sc = new Scanner(System.in);

        // input number of files
        System.out.print("Enter the no. of files: ");
        int num = sc.nextInt();

        // array for file sizes
        int arr[] = new int[num];

        // input size of each file
        for (int i = 0; i < arr.length; i++)
        {
            System.out.print("Enter the size of File " + (i + 1) + ": ");
            arr[i] = sc.nextInt();
        }

        // sort the files
        Sort(arr);

        // make cumulative sum array
        for (int i = 1; i < arr.length; i++)
        {
            arr[i] = arr[i - 1] + arr[i];
        }

        // add all values
        float sum = 0;
        for (int i = 0; i < arr.length; i++)
        {
            sum += arr[i];
        }

        // print mean retrieval time
        System.out.printf("The Mean Retrieval Time is %.2f", (sum / num));

        sc.close();
    }
}
