
import java.util.Scanner;


public class BelajarPercabangan {

    public static void main(String[] args) {
        
        Scanner Inputuser= new Scanner(System.in);
            System.out.println("inputkan nilai anda: ");    
            int nilai= Inputuser.nextInt();
                System.out.println("Nilai anda: "+nilai);
        
            if (nilai>=70) {
                System.out.println("Anda Lulus");
            } else {System.out.println("Anda Tidak Lulus");
            } 
     

        //PERCABANGAN IF ELSE 2
        Scanner scanner = new Scanner(System.in);
        System.out.println("Masukkan nilai anda: ");
        int nilai2 = scanner.nextInt();
        if (nilai2 < 0 || nilai2 > 100) {
            System.out.println("Nilai tidak valid");
        } else {
            if (nilai2 >= 90) {
                System.out.println("A");
            } else if (nilai2 >= 80) {
                System.out.println("B");
            } else if (nilai2 >= 70) {
                System.out.println("C"); 
            } else if (nilai2 >= 60) {
                System.out.println("D");
            } else if (nilai2 < 50) {
                System.out.println("E");
          }
        }
        
        scanner.close();

    }

   
    
}
