#include <stdio.h>
#include <stdlib.h>

// Structure for a Binary Tree Node
typedef struct Node {
    int data;                 // Value stored in the node
    struct Node* left;       // Pointer to left child
    struct Node* right;      // Pointer to right child
} Node;

// Function to create a new node with given data
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node)); // Allocate memory for node
    newNode->data = data;             // Assign data
    newNode->left = newNode->right = NULL; // No children initially
    return newNode;
}

// Function to insert a new value into the Binary Search Tree
struct Node* insert(struct Node* root, int data) {
    if (root == NULL) {
        return createNode(data); // Tree empty → create new node
    } else if (data <= root->data) {
        root->left = insert(root->left, data); // Insert in left subtree
    } else {
        root->right = insert(root->right, data); // Insert in right subtree
    }
    return root;
}

// Preorder Traversal: Root → Left → Right
void Preorder(struct Node* root) {
    if (root == NULL)
        return;

    printf("%d ", root->data);    // Visit root
    Preorder(root->left);         // Traverse left subtree
    Preorder(root->right);        // Traverse right subtree
}

// Inorder Traversal: Left → Root → Right
void Inorder(struct Node* root) {
    if (root == NULL)
        return;

    Inorder(root->left);          // Traverse left subtree
    printf("%d ", root->data);    // Visit root
    Inorder(root->right);         // Traverse right subtree
}

// Postorder Traversal: Left → Right → Root
void Postorder(struct Node* root) {
    if (root == NULL)
        return;

    Postorder(root->left);        // Traverse left subtree
    Postorder(root->right);       // Traverse right subtree
    printf("%d ", root->data);    // Visit root
}

// Search for a value in BST
struct Node* search(struct Node* root, int key) {
    if (root == NULL || root->data == key) {
        return root; // Found or tree is empty
    }

    if (key < root->data) {
        return search(root->left, key); // Search in left subtree
    } else {
        return search(root->right, key); // Search in right subtree
    }
}

// Main function
int main() {
    struct Node* r = NULL; // Root pointer initialized to NULL

    // Take number of elements from user
    printf("Enter the number of elements: ");
    int n;
    scanf("%d", &n);

    // Insert elements into BST
    for (int i = 0; i < n; i++) {
        printf("Enter element %d: ", i + 1);
        int data;
        scanf("%d", &data);
        r = insert(r, data);
    }

    // Display Preorder Traversal
    printf("Preorder: ");
    Preorder(r);
    printf("\n");

    // Display Inorder Traversal
    printf("Inorder: ");
    Inorder(r);
    printf("\n");

    // Display Postorder Traversal
    printf("Postorder: ");
    Postorder(r);
    printf("\n");

    // Search for a value
    int key;
    printf("Enter value to search: ");
    scanf("%d", &key);
    struct Node* found = search(r, key);
    if (found != NULL)
        printf("Value %d found in the tree.\n", key);
    else
        printf("Value %d not found in the tree.\n", key);

    return 0;
}
