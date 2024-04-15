  <!-- /** -->
  <!--  * -->
  <!--  * SHELL: SH -->
  <!--  * -->
  <!--  *   1. The client sends an HTTP request to the server. -->
  <!--  *   2. The server sends a shell.html right away and begins to prepare for the data. The shell.html does not have the data in it. -->
  <!--  *   3. The client receives the shell.html and sends another HTTP request to the server to get the data. -->
  <!--  *   4. The server can either send the data right away(probably because it has finished preparing the data already) or make the client wait for the data to be prepared. -->
  <!--  *   5. The client receives the data, and the hydrator that was included in the shell.html file analyzes the data. -->
  <!--  *      5-1. If the data is the expected form of data, then it puts all data into the right spaces. -->
  <!--  *      5-2. If the data is not in the expected form, then it shows the error message or UIs to the users. -->
  <!--  *   6. DONE -->
  <!--  * -->
  <!--  * SERVER: SV -->
  <!--  * -->
  <!--  *   1. The client sends an HTTP request to the server. -->
  <!--  *   2. The server sends the shell.html but with the data in it. -->
  <!--  *   3. The client receives the shell.html -->
  <!--  *   4. DONE -->
  <!--  * -->
  <!--  * FULLLY STATIC: FS -->
  <!--  * -->
  <!--  *   1. The client sends an HTTP request to the server. -->
  <!--  *   2. The server sends the pre-compiled shell.html without waiting. -->
  <!--  *   3. The client receives the shell.html -->
  <!--  *   4. DONE -->
  <!--  * -->

  <!-- Rehydratable STATIC: RS -->
  <!--  */ -->
  <!---->
