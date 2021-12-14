# Angular + PO UI no fluig

O objetivo desse repositório é mostrar uma **técnica** de como adicionar uma aplicação com Angular + PO UI no fluig.

Essa técnica consiste em criar uma *widget* e adicionar uma aplicação angular dentro dela. Posteriormente podemos criar ou editar uma página e adicionar essa *widget* nela.

Abaixo estão os passos necessários para realizar essa técnica com todas as configurações necessárias.

---
**NOTA**

Nesta documentação contém um exemplo de construção de widget com framework Angular, que também pode ser usada nos demais frameworks similares. 
Essa é uma **versão beta** liberada apenas para parceiros de desenvolvimento Fluig. Caso encontre algum problema, orientamos reportar para a equipe de Parceiros do Fluig.
---


## Pré requisitos

O projeto foi testado e validado com as versões abaixo. Versões superiores ou inferiores podem ser utilizadas porém erros/problemas podem acontecer.

- Node 10.15.x
- NPM 6.4.x
- Angular CLI: 7.1.3
- Java 7 ou superior
- Maven 3.6.0


## Executando o projeto

Para executar esse projeto de exemplo, devemos executar somente o comando a seguir:

```bash
mvn clean install
```

Após a execução, é necessário realizar o deploy do artefato **app_angular_poui.war** pela [Central de Componentes](http://tdn.totvs.com/display/public/fluig/Central+de+componentes) do fluig. Depois, basta criar ou editar uma página já existente e adicionar a widget **Angular APP PO UI**.

Abaixo foi disponibilizado uma documentação detalhada de como criar esse projeto.


## Passo a passo


### Passo 1 - Criando a widget

Podemos criar uma widget de duas formas. Pela **documentação oficial** ou através do *plugin* para a IDE Eclipse, **fluig Studio**.

Documentação de criação de um widget:
http://tdn.totvs.com/display/public/fluig/Widgets

Guia de instalação fluig Studio:
http://tdn.totvs.com/pages/releaseview.action?pageId=73078179


### Passo 2 - Adicionando o APP Angular

Caso você ainda não tenha instalado o pacote @angular/cli, instale-o via npm.

```bash
npm i -g @angular/cli@9.1.0
```

Essa próxima etapa é relativamente simples. No terminal, dentro do diretório `src/main/` devemos executar o comando:

```javascript
ng new <NOME_DO_APP> --skip-install
```

O parâmetro `--skip-install` permite criar o projeto, contudo, não instalará as dependências automaticamente. Isso porque devemos alterar a versão do Angular antes. Faremos a instalação posteriormente.


### Passo 3 - Configurando o plugin maven

Após adicionar o APP Angular, devemos configurar o plugin [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) para realizar o gerenciamento da versão do Node, instalação e compilação do projeto.

```xml
<groupId>com.github.eirslett</groupId>
<artifactId>frontend-maven-plugin</artifactId>
```

O primeiro `execution` deve realizar a instalação do node e do npm. Então devemos adicionar, dentro da *tag* `executions` devemos adicionar as seguintes instruções:

```xml
<execution>
  <id>install node and npm</id>
  <goals>
    <goal>install-node-and-npm</goal>
  </goals>
  <phase>generate-resources</phase>
</execution>
```

Depois devemos adicionar todos os passos para executar a instalação e compilação do nosso projeto, chamando os `scripts` npm configurados no **package.json**.

```xml
<!-- Instalação das dependências -->
<execution>
  <id>npm install</id>
  <goals>
    <goal>npm</goal>
  </goals>
  <configuration>
    <arguments>install</arguments>
  </configuration>
</execution>

<!-- Compilação do projeto em modo produção -->
<execution>
  <id>npm run</id>
  <goals>
    <goal>npm</goal>
  </goals>
  <configuration>
    <arguments>run build-prod</arguments>
  </configuration>
</execution>
```

[Veja a configuração final aqui.](https://github.com/fluig/app-angular-poui/blob/master/pom.xml#L14)


### Passo 4 - Configurando APP Angular


Devemos agora configurar o APP Angular para funcionar dentro da widget, para isso, vamos alterar a confiruração dos parâmetros `outputPath` e `deployUrl` do arquivo [angular.json](https://github.com/fluig/app-angular-poui/blob/master/src/main/angular-app/angular.json).

**outputPath**:

```json
"outputPath": "../webapp/resources",
```

**deployUrl**:

```json
"deployUrl": "/app_angular_poui/resources/",
```

**Atenção:** O valor **app_angular_poui** obrigatoriamente precisa ser o **code** da widget.


### Passo 5 - Configurando APP para Paths dinâmicos


Precisamos primeiro adicionar o arquivo [app.config.ts](https://github.com/fluig/app-angular-poui/blob/master/src/main/angular-app/src/app/app.config.ts) no projeto e depois configurar no [módulo principal](https://github.com/fluig/app-angular-poui/blob/master/src/main/angular-app/src/app/app.module.ts) da nossa aplicação.

```ts
...
import { APP_CONFIG } from './app.config';
import { APP_BASE_HREF } from '@angular/common';
...
providers: [
  ...
  { provide: APP_BASE_HREF, useValue: APP_CONFIG.APP_BASE || '/' }
],
```

Isso garante que o APP funcione em qualquer rota ou página do fluig, inclusive em páginas públicas.


### Passo 6 - Configurando view.ftl


Agora precisamos adicionar a tag principal da aplicação na **view.ftl** da widget. Esse arquivo se comportará como o **index.html** de uma aplicação Angular padrão.

**Nota**

Deve ser incluído somente a **tag principal** da sua aplicação, `<app-root>` e os scripts e estilos gerados. Tags como `<html>`, `<body>`, `<head>`, `<title>` e etc **não** devem ser incluídas na **view.ftl** da widget.

```html
...
<app-root></app-root>
...
```

Devemos adicionar também os bundles padrões do Angular.

```html
<!-- CSS -->
<link href="/${coreContext}/resources/styles.css" rel="stylesheet"/>

...
<!-- JS -->
<script src="/${coreContext}/resources/runtime.js" defer></script>
<script src="/${coreContext}/resources/polyfills-es5.js" nomodule defer></script>
<script src="/${coreContext}/resources/polyfills.js" defer></script>
<!-- scripts.js será usado somente se for adicionado algum script no angular.json do APP -->
<script src="/${coreContext}/resources/scripts.js" defer></script>
<script src="/${coreContext}/resources/main.js" defer></script>
```

Precisamos também configurar alguns parâmentros do fluig para que sejam enviados para o APP angular.

```html
<#assign coreContext='app_angular_poui'>
<script>
/**
 * The script below sets some enviroment variables to be used inside
 * Angular application. (see: app.config.ts)
 */
(function setEnvironmentParams() {
  var protectedContextPath = '${protectedContextPath!""}';
  var contextPath = '${contextPath!""}';
  // base url for frontend application
  var baseUrl = protectedContextPath + '/${tenantCode!""}';
  // replace '/p' for public pages
  if (window.location.href.indexOf(protectedContextPath) === -1) {
    baseUrl = baseUrl.replace(protectedContextPath, contextPath);
  }
  // base url for frontend application
  window['_app_baseUrl'] = baseUrl;
  // get page code
  window['_app_pageCode'] = '${(pageCode!"")}';
})();
</script>
```

Esses parâmetros serão obtidos pelo arquivo [app.config.ts](https://github.com/fluig/app-angular-poui/blob/master/src/main/angular-app/src/app/app.config.ts). [Veja a configuração final aqui.](https://github.com/fluig/app-angular-poui/blob/master/src/main/resources/view.ftl)

### Passo 7 - Adicionando PO UI na aplicação

Agora podemos adicionar o PO UI em nosso APP. Para mais detalhes, acesse a [documentação oficial de instalação do PO UI](https://po-ui.io/guides/getting-started).

#### Configurando as dependências

Antes de executar a instalação, é necessário que todas as dependências do projeto estejam declaradas de acordo com a versão do PO UI e Angular no arquivo **package.json**, localizado na raiz da aplicação.

```json
...
"dependencies": {
  "@angular/animations": "~9.1.0",
  "@angular/common": "~9.1.0",
  "@angular/compiler": "~9.1.0",
  "@angular/core": "~9.1.0",
  "@angular/forms": "~9.1.0",
  "@angular/platform-browser": "~9.1.0",
  "@angular/platform-browser-dynamic": "~9.1.0",
  "@angular/router": "~9.1.0",
  "rxjs": "~6.5.4",
  "tslib": "^1.11.1",
  "zone.js": "~0.10.3"
  ...
},
"devDependencies": {
  "@angular-devkit/build-angular": "~0.901.0",
  "@angular/cli": "~9.1.0",
  "@angular/compiler-cli": "~9.1.0",
  "@angular/language-service": "~9.1.0",
  "typescript": "~3.8.3",
  ...
}
...
```

Após configurar seu arquivo, certifique-se de salvar as alterações realizadas e também que seu terminal esteja apontando para o caminho raiz da aplicação, então execute o comando:

```bash
npm install
```

Após a execução deverá conter a pasta **node_modules** em seu projeto com as dependências necessárias.

Utilizando o comando ng add do Angular CLI, vamos adicionar o Po em seu projeto e o mesmo se encarregará de configurar o tema, instalar o pacote e importar o módulo do Po. Para isso, execute o seguinte comando:

```bash
ng add @po-ui/ng-components
```

Ao executar o comando acima, será perguntado se deseja incluir uma estrutura inicial em seu projeto com menu lateral, página e toolbar, utilizando componentes do Po, caso desejar, apenas informe: Y.

#### Configurando o módulo principal

No módulo principal da aplicação é preciso fazer a importação do módulo **PoModule** e incluí-lo nos imports do mesmo. Veja abaixo como fazer:

```ts
...
import { PoModule } from '@po-ui/ng-components';

@NgModule({
  ...
  imports: [
    ...
    PoModule
  ],
  ...
})
...
```

#### Configurando o estilo

```json
"styles": [
  "./node_modules/@po-ui/style/css/po-theme-default.min.css",
  "styles.css"
],
```

Pronto, agora temos uma aplicação Angular com PO UI configurada. Podemos agora executar o comando `mvn clean install` na raiz do nosso projeto e depois realizar o deploy dele no fluig.
