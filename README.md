# Angular + THF no fluig

O objetivo desse repositório é mostrar uma técnica de como adicionar uma aplicação com Angular + THF no fluig.

Essa técnica consiste em criar um *layout* e adicionar uma aplicação angular dentro dele. Posteriormente podemos criar ou editar uma página e adicionar ele *layout* nela.

Abaixo estão os passos necessários para realizar essa técnica com todas as configurações necessárias.


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

Após a execução, é necessário realizar o deploy do artefato **app_angular_thf.war** pela [Central de Componentes](http://tdn.totvs.com/display/public/fluig/Central+de+componentes) do fluig. Depois, basta criar ou editar uma página já existente e trocar o layout pelo **Universo TOTVS APP THF**.

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

Essa etapa é relativamente simples. No terminal, dentro do diretório `src/main/` devemos executar o comando:

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
"deployUrl": "/app_angular_thf/resources/",
```

**Atenção:** O valor **app_angular_thf** obrigatoriamente precisa ser o **code** do layout.


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
<script type="text/javascript" src="/${coreContext}/resources/runtime.js"></script>
<script type="text/javascript" src="/${coreContext}/resources/polyfills.js"></script>
<!-- scripts.js será usado somente se for adicionado algum script no angular.json do APP -->
<script type="text/javascript" src="/${coreContext}/resources/scripts.js"></script>
<script type="text/javascript" src="/${coreContext}/resources/main.js"></script>
```

Precisamos também configurar alguns parâmentros do fluig para que sejam enviados para o APP angular.

```html
<#assign coreContext='app_angular_thf'>
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

### Passo 7 - Adicionando THF na aplicação

Commit: [Adicionando THF na aplicação.](https://github.com/fluig/app-angular-thf/commit/9c306cdec8f57e2b8a91769afffbe756b86d7e64)


Agora podemos adicionar o THF em nosso APP. Para mais detalhes, acesse a [documentação oficial de instalação do THF](https://thf.totvs.com.br/guides/getting-started).

#### Configurando as dependências

Antes de executar a instalação, é necessário que todas as dependências do projeto estejam declaradas de acordo com a versão do THF e Angular no arquivo **package.json**, localizado na raiz da aplicação.

```json
...
"dependencies": {
  "@angular/animations": "~8.0.0",
  "@angular/common": "~8.0.0",
  "@angular/compiler": "~8.0.0",
  "@angular/core": "~8.0.0",
  "@angular/forms": "~8.0.0",
  "@angular/platform-browser": "~8.0.0",
  "@angular/platform-browser-dynamic": "~8.0.0",
  "@angular/platform-server": "~8.0.0",
  "@angular/router": "~8.0.0",
  "rxjs": "6.3.3",
  ...
},
"devDependencies": {
  "@angular-devkit/build-angular": "0.11.3",
  "@angular/cli": "~8.0.1",
  "@angular/compiler-cli": "~8.0.0",
  "@angular/language-service": "~8.0.0",
  "typescript": "3.1.6",
  ...
}
...
```

Após configurar seu arquivo, certifique-se de salvar as alterações realizadas e também que seu terminal esteja apontando para o caminho raiz da aplicação, então execute o comando:

```bash
npm install
```

Após a execução deverá conter a pasta **node_modules** em seu projeto com as dependências necessárias.

Em seguida instale o THF, para isso, execute o seguinte comando:

```bash
npm install @totvs/thf-ui --save
```

Com este comando os pacotes **@totvs/thf-ui** e **@totvs/thf-theme** serão instalados e estarão disponíveis para serem usados no projeto.

#### Configurando o módulo principal

No módulo principal da aplicação é preciso fazer a importação do módulo **ThfModule** e incluí-lo nos imports do mesmo. Veja abaixo como fazer:

```ts
...
import { ThfModule } from '@totvs/thf-ui';

@NgModule({
  ...
  imports: [
    ...
    ThfModule
  ],
  ...
})
...
```

#### Configurando o estilo

```json
"styles": [
  "node_modules/@totvs/thf-theme/css/thf-theme-default.min.css",
  "styles.css"
],
```

Pronto, agora temos uma aplicação Angular com THF configurada. Podemos agora executar o comando `mvn clean install` na raiz do nosso projeto e depois realizar o deploy dele no fluig.


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
