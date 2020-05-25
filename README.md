# Angular + PO UI no fluig

O objetivo desse repositório é mostrar uma **técnica** de como adicionar uma aplicação com Angular + PO UI no fluig.

Essa técnica consiste em criar um *layout* e adicionar uma aplicação angular dentro dele. Posteriormente podemos criar ou editar uma página e adicionar ele *layout* nela.

Abaixo estão os passos necessários para realizar essa técnica com todas as configurações necessárias.

---
**NOTA**

Este projeto não possui suporte técnico do time do Fluig. Ele é somente um exemplo de como podemos adicionar uma aplicação Angular utilizando a biblioteca PO UI dentro da plataforma Fluig.  Ele não é atualizado constantemente e pode ficar depreciado ao longo do tempo. Sinta-se à vontade para colaborar com esse repositório e ajudar a evoluí-lo.

---


## Pré requisitos

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

Após a execução, é necessário realizar o deploy do artefato **app_angular_poui.war** pela [Central de Componentes](http://tdn.totvs.com/display/public/fluig/Central+de+componentes) do fluig. Depois, basta criar ou editar uma página já existente e trocar o layout pelo **Universo TOTVS APP PO UI**.

Abaixo foi disponibilizado uma documentação detalhada de como criar esse projeto.


## Passo a passo


### Passo 1 - Criando o layout

Commit: [Adicionando layout base para a aplicação.](https://github.com/fluig/app-angular-thf/commit/11a4f34d351e5e95b81011b0c43da12f30c522bb)

Podemos criar um layout através de duas formas. Pela **documentação oficial** ou através do *plugin* para a IDE Eclipse, **fluig Studio**.

Documentação de criação de um layout:
http://tdn.totvs.com/display/public/fluig/Layouts

Guia de instalação fluig Studio:
http://tdn.totvs.com/pages/releaseview.action?pageId=73078179


### Passo 2 - Adicionando o APP Angular

Commit: [Adicionando APP angular no layout.](https://github.com/fluig/app-angular-thf/commit/727c11839f0c78154dfcf8fe539642f1a9b90651)

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

Commit: [Configurando o plugin maven para realizar a instalação e compilação do projeto.](https://github.com/fluig/app-angular-thf/commit/1c8f780eb17cfdc1b716784b9078b8c276855ec3)

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
<!-- Registry NPM para encontrar os pacotes do fluig -->
<execution>
  <id>npm set registry</id>
  <goals>
    <goal>npm</goal>
  </goals>
  <configuration>
    <arguments>set registry http://nexus.fluig.com/repository/npm-group/</arguments>
  </configuration>
</execution>

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

[Veja a configuração final aqui.](https://github.com/fluig/app-angular-thf/blob/master/pom.xml#L14)


### Passo 4 - Configurando APP Angular

Commit: [Configurando outputPath e deployUrl para funcionamento no layout.](https://github.com/fluig/app-angular-thf/commit/5bc26ab8bbaaa68ba72f8c6b444558b75678001c)

Devemos agora configurar o APP Angular para funcionar dentro do layout, para isso, vamos alterar a confiruração dos parâmetros `outputPath` e `deployUrl` do arquivo [angular.json](https://github.com/fluig/app-angular-thf/blob/master/src/main/universo-totvs-app/angular.json).

**outputPath**:

```json
"outputPath": "../webapp/resources",
```

**deployUrl**:

```json
"deployUrl": "/app_angular_poui/resources/",
```

**Atenção:** O valor **app_angular_poui** obrigatoriamente precisa ser o **code** do layout.


### Passo 5 - Configurando APP para Paths dinâmicos

Commit: [Configurando APP para funcionar em paths dinâmicos.](https://github.com/fluig/app-angular-thf/commit/7c48b71d7af56d739b0feb3f3596ef0a4b3ad840)

Precisamos primeiro adicionar o arquivo [app.config.ts](https://github.com/fluig/app-angular-thf/blob/master/src/main/universo-totvs-app/src/app/app.config.ts) no projeto e depois configurar no módulo principal da nossa aplicação.

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

Commit: [Adicionando tag principal e bundles do app no view.ftl do layout.](https://github.com/fluig/app-angular-thf/commit/ce738216ba9d74499a928e47b3d91abd08eb6a93)

Agora precisamos adicionar a tag principal da aplicação na **view.ftl** do layout. Esse arquivo se comportará como o **index.html** de uma aplicação Angular padrão.

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

Esses parâmetros serão obtidos pelo arquivo [app.config.ts](https://github.com/fluig/app-angular-thf/blob/master/src/main/universo-totvs-app/src/app/app.config.ts). [Veja a configuração final aqui.](https://github.com/fluig/app-angular-thf/blob/master/src/main/resources/view.ftl)

### Passo 7 - Adicionando PO UI na aplicação

Commit: [Adicionando PO UI na aplicação.](https://github.com/fluig/app-angular-thf/commit/9c306cdec8f57e2b8a91769afffbe756b86d7e64)


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


## Dicas


### Trabalhando em modo de desenvolvimento

Em desenvolvimento...


### Menu fluig apontando para rotas Angular

Em desenvolvimento...


###  Trabalhando com permissionamento de páginas e componentes

Em desenvolvimento...


### Trabalhando com i18n

Em desenvolvimento...

### Trabalhando com páginas públicas

Em desenvolvimento...
