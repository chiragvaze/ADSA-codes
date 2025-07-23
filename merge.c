#include <stdio.h>

#define max_SIZE 100
int SIZE;
int A[SIZE], B[SIZE];


void merge(int lb, int mid, int ub) {
    int i = lb;
    int j = mid + 1;
    int k = lb;

    while (i <= mid && j <= ub) {
        if (A[i] <= A[j]) {
            B[k] = A[i];
            i++;
        } else {
            B[k] = A[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements
    if (i <= mid) {
        while (i <= mid) {
            B[k] = A[i];
            i++;
            k++;
        }
    } else {
        while (j <= ub) {
            B[k] = A[j];
            j++;
            k++;
        }
    }

    // Copy back from B to A
    for (k = lb; k <= ub; k++) {
        A[k] = B[k];
    }
}

void mergeSort(int lb, int ub) {
    if (lb < ub) {
        int mid = (lb + ub) / 2;
        mergeSort(lb, mid);
        mergeSort(mid + 1, ub);
        merge(lb, mid, ub);
    }
}


int main() {
    printf("Enter size of the array ");
    scanf("%d", &SIZE);
    
    printf("Enter %d elements:\n", SIZE);
    for (int i = 0; i < SIZE; i++) {
        scanf("%d", &A[i]);
    }

    mergeSort(0, SIZE - 1);

    printf("Sorted array:\n");
    for (int i = 0; i < SIZE; i++) {
        printf("%d ", A[i]);
    }
    printf("\n");

    return 0;
}
