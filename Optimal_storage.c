#include <stdio.h>

// Function to sort the array in ascending order (Bubble Sort)
void sort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-1-i; j++) {
            if (arr[j] > arr[j+1]) {
                // swap
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

int main() {
    int num;

    // Input number of files
    printf("Enter the number of files: ");
    scanf("%d", &num);

    int arr[num];

    // Input sizes of files
    for (int i = 0; i < num; i++) {
        printf("Enter the size of File %d: ", i + 1);
        scanf("%d", &arr[i]);
    }

    // Sort file sizes
    sort(arr, num);

    // Create cumulative sum array
    for (int i = 1; i < num; i++) {
        arr[i] = arr[i] + arr[i - 1];
    }

    // Calculate total retrieval time
    float sum = 0;
    for (int i = 0; i < num; i++) {
        sum += arr[i];
    }

    // Calculate and display Mean Retrieval Time
    printf("The Mean Retrieval Time is %.2f\n", sum / num);

    return 0;
}
