# SIERRA-MOVIL

Este va ser un sistema completo informativo respecto a las opciones de movilidad dentro de la ubicación en la que se encuentre el usuario. Para esta prueba beta solo contará con una cobertura limitada y posteriormente escalará para abarcar más terreno y medios de transportes cercanos y fáciles de ubicar para todos.

---

## 2.- Reporte de configuración del entorno de desarrollo

Este reporte técnico documenta en detalle la arquitectura, herramientas, plataformas, dependencias y parámetros de configuración establecidos para el desarrollo, compilación y ejecución de la aplicación móvil **SIERRA-MOVIL**.

---

### 2.1 Lista de herramientas utilizadas

A continuación, se describen las herramientas, plataformas, lenguajes, frameworks y SDKs que conforman el ecosistema de trabajo:

| Categoría | Herramienta / Tecnología | Versión / Detalle | Propósito / Función |
| :--- | :--- | :--- | :--- |
| **Sistema Operativo** | Microsoft Windows 11 Home (64 bits) | Versión 10.0.26200 | Plataforma anfitriona para el desarrollo del software. |
| **Entorno de Ejecución** | Node.js | v20.19.4 (LTS) | Motor de ejecución para herramientas de compilación y JavaScript. |
| **Gestor de Paquetes** | PNPM / NPM | PNPM v10.18.0 / NPM v10.8.2 | Administración eficiente de dependencias del proyecto. |
| **Lenguaje de Programación** | TypeScript | v5.7.3 | Tipado estático para robustez, escalabilidad y mantenimiento. |
| **Lenguaje Base** | JavaScript (ESNext) / JSX / TSX | ECMAScript 2023+ | Lenguaje base para los componentes y lógica reactiva. |
| **Framework Móvil** | React Native | 0.86.3 | Framework para creación de interfaces nativas multiplataforma. |
| **Biblioteca de UI** | React | 19.2.3 | Biblioteca base para la gestión de estados y componentes. |
| **Plataforma / SDK Móvil** | Expo SDK | ~57.0.0 | Plataforma integral para desarrollo, herramientas y APIs nativas. |
| **SDK de Android** | Android SDK Platform-Tools & Build-Tools | Ubicación: `%LOCALAPPDATA%\Android\Sdk` | Compilación, emulación y depuración en la plataforma Android. |
| **Entorno Java (JDK)** | Java SE Runtime / HotSpot VM | v1.8.0_461 (build 25.461-b11) | Requisito para herramientas de compilación y emulación de Android. |
| **Control de Versiones** | Git | v2.54.0.windows.1 | Control de código fuente y versionado colaborativo. |
| **Entorno de Desarrollo (IDE)** | Visual Studio Code / Antigravity IDE | Última versión estable | Entorno integrado con extensiones de React Native, TypeScript y Expo. |
| **Pruebas y Depuración** | Expo Go / Emulador Android | Android Virtual Device (AVD) / Dispositivo físico | Previsualización y prueba en tiempo real con recarga rápida (Fast Refresh). |
| **Servicios y APIs** | Google Maps Platform API | Android Maps SDK | Proveedor cartográfico para renderizado de mapas y geolocalización. |

---

### 2.2 Parámetros de configuración

En esta sección se detallan las versiones específicas, variables de entorno, dependencias y archivos de ajuste del proyecto.

#### A. Dependencias del Proyecto (`package.json`)

**Dependencias de Producción (`dependencies`):**
- `expo`: `~57.0.0` - Núcleo del ecosistema Expo.
- `expo-asset`: `~57.0.0` - Gestión de recursos estáticos (imágenes, fuentes, iconos).
- `expo-status-bar`: `~57.0.1` - Control estilístico de la barra de estado del dispositivo.
- `react`: `19.2.3` - Núcleo de componentes React.
- `react-native`: `0.86.3` - Capa de enlace con componentes nativos de Android/iOS.
- `react-native-maps`: `1.27.2` - Componente nativo para visualización de mapas y marcadores.
- `react-native-safe-area-context`: `~5.7.0` - Manejo de zonas seguras en pantallas con notch o bordes curvos.
- `react-native-svg`: `15.15.4` - Renderizado vectorial de iconos y gráficos escalables.
- `lucide-react-native`: `^0.428.0` - Catálogo de iconografía moderna y ligera.

**Dependencias de Desarrollo (`devDependencies`):**
- `@babel/core`: `^7.20.0` - Transpilador de código JavaScript/TypeScript.
- `@types/react`: `~19.2.4` - Definiciones de tipos para React.
- `typescript`: `~5.7.3` - Compilador de TypeScript.

---

#### B. Variables de Entorno del Sistema

Para el correcto funcionamiento de las herramientas de compilación de Android y Expo CLI, se establecen las siguientes variables en el sistema operativo:

| Variable | Valor / Ruta de Ejemplo | Finalidad |
| :--- | :--- | :--- |
| `ANDROID_HOME` | `C:\Users\ASUS\AppData\Local\Android\Sdk` | Localización de SDK Platforms, Build-Tools y Platform-Tools de Android. |
| `JAVA_HOME` | `C:\Program Files\Java\jdk1.8.0_461` | Directorio raíz del Kit de Desarrollo de Java para Gradle y el compilador de Android. |
| `PATH` | `%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%JAVA_HOME%\bin;...` | Permite ejecutar herramientas de línea de comandos como `adb`, `emulator` y `node` desde cualquier terminal. |

---

#### C. Configuración del Gestor de Paquetes (`.npmrc`)

Dado el uso de PNPM con React Native y paquetes que requieren resolución plana de dependencias, se configuró la directiva de enlace:

```ini
node-linker=hoisted
```

> **Nota:** La directiva `hoisted` asegura que los módulos se eleven al directorio `node_modules` raíz, garantizando la compatibilidad con el empaquetador Metro y las bibliotecas nativas de React Native.

---

#### D. Configuración del Manifiesto Móvil (`app.json`)

El archivo de configuración principal de Expo define los metadatos del proyecto y los permisos nativos requeridos:

- **Nombre y Slug:** `SierraTransporte` (`sierra-transporte`)
- **Versión:** `1.0.0`
- **Orientación:** `portrait` (bloqueo vertical)
- **Tema:** `light`
- **Configuración de Google Maps (Android):**
  - Llave de API: Asignada bajo `expo.android.config.googleMaps.apiKey`.
- **Permisos requeridos en Android:**
  - `ACCESS_FINE_LOCATION`: Permite obtener la ubicación precisa del dispositivo mediante GPS.
  - `ACCESS_COARSE_LOCATION`: Permite obtener una aproximación de la ubicación a través de datos celulares y Wi-Fi.

---

#### E. Configuración de TypeScript (`tsconfig.json`)

El entorno de tipado se basa en las recomendaciones oficiales de Expo:

```json
{
  "extends": "./node_modules/expo/tsconfig.base.json",
  "compilerOptions": {
    "strict": true
  }
}
```

- **`strict: true`**: Habilita todas las comprobaciones estrictas de tipos para prevenir errores de referencia nula y variables no tipadas en tiempo de desarrollo.

---

### 2.3 Procedimiento para replicar y ejecutar el entorno

Para poner en marcha el proyecto en una nueva estación de trabajo, siga los siguientes pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd SIERRA-MOVIL
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   # Alternativa con npm:
   # npm install
   ```

3. **Configurar la API Key de Google Maps:**
   - Abrir el archivo `app.json`.
   - Remplazar `"YOUR_GOOGLE_MAPS_API_KEY"` por una clave válida de Google Cloud Console con acceso habilitado a **Maps SDK for Android**.

4. **Iniciar el servidor de desarrollo (Metro Bundler):**
   ```bash
   pnpm start
   # o
   npx expo start
   ```

5. **Ejecución en dispositivos:**
   - **Dispositivo Físico:** Escanear el código QR generado en la terminal utilizando la aplicación **Expo Go** (Android / iOS).
   - **Emulador Android:** Presionar la tecla `a` en la terminal o ejecutar `pnpm android`.
   - **Navegador Web:** Presionar la tecla `w` en la terminal o ejecutar `pnpm web`.
