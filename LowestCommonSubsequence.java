package LowestCommonSubsequence;
import java.util.Arrays;
import java.util.Scanner;
class LCS {
    static int lcsLength(String S1, String S2, int[][] array) {
        int m = S1.length();
        int n = S2.length();
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (S1.charAt(i - 1) == S2.charAt(j - 1)) {
                    array[i][j] = array[i - 1][j - 1] + 1;
                }
                else {
                    array[i][j] = Math.max(array[i - 1][j], array[i][j - 1]);
                }
            }
        }
        return array[m][n];
    }

    static String lcs(String S1, String S2) {
        int m = S1.length();
        int n = S2.length();
        int[][] array = new int[m + 1][n + 1];
        lcsLength(S1, S2, array);

        int i = m, j = n;
        StringBuilder lcsStr = new StringBuilder();
        while (i > 0 && j > 0) {
            if (S1.charAt(i - 1) == S2.charAt(j - 1)) {
                lcsStr.append(S1.charAt(i - 1));
                i--; j--;
            } else if (array[i - 1][j] > array[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        return lcsStr.reverse().toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("String s1: ");
        String S1 = sc.nextLine();

        System.out.print("String s2: ");
        String S2 = sc.nextLine();

        System.out.println("LCS length: " + lcsLength(S1, S2, new int[S1.length()+1][S2.length()+1]));
        System.out.println("LCS: " + lcs(S1, S2));
    }
}
