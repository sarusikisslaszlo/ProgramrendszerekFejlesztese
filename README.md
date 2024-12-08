# DevOps SZTE Gyakorlati Projekt

A projekt célja a **Felhő és DevOps alapok gyakorlatának** projekt megvalósítása.  

## **A projekt során használt technológiák:**
- **Node.js** 
- **TypeScript**  
- **Jest** *(Teszteléshez)*  
- **Angular**  
- **MongoDB**  
- **Nginx**  
- **Ngrok**  
- **Jenkins**  
- **Docker**  
- **Kubernetes**  
- **Azure**  

---

## **Telepítési leírás:**
1. **Docker Compose Indítása:**  
   A telepítés első lépése a `docker-compose up` parancs futtatása, ami elindítja:  
   - **Backendet**  
   - **Frontendet**  
   - **MongoDB-t**  

2. **Alkalmazás Architektúra:**  
   Az alkalmazás **Nginx**-et használ a hálózati forgalom irányítására, valamint az **Angular** Dockeres futtatására. Ez lehetővé teszi a **Backend** és a **Frontend** közötti zökkenőmentes kommunikációt.

3. **Projekt Fájlszerkezet:**  
   - Kubernetes-specifikus fájlok a `k8s` mappában találhatók.  
   - A **Jenkinsfile** a **pipeline** futtatásához szükséges konfigurációkat tartalmazza.

4. **Ngrok Szerepe:**  
   Az **Ngrok** a GitHub és Jenkins szinkronizálásában játszik kulcsfontosságú szerepet. Ez biztosítja a lokális gépem elérhetőségét egy külső URL-en keresztül, amely a Jenkins felületére irányít a **8080-as** porton.  

5. **Automatikus Build és Deployment:**  
   - **GitHub Webhook:** Amikor egy **push** történik a **master** branchre, a Jenkins automatikusan elindítja a **pipeline-t**.  
   - **Pipeline Felépítése:**  
     - Konténerizálás Docker segítségével.  
     - Docker image-ek létrehozása.  
     - DockerHub-ra pusholás.  
     - Kubernetes az image-ek lehúzására és az Azure-n történő telepítésére.

---

### **Megjegyzés:**  
Sajnos néhány konfigurációs problémába ütköztem, ezért nem sikerült mindent befejeznem. Azonban az alapvető **workflow** elképzelése megvalósult, amely lefedi a modern felhő- és DevOps-alapú fejlesztési és telepítési folyamatokat.
