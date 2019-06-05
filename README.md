# Angular + THF no fluig

O objetivo desse repositório é mostrar uma técnica de como adicionar uma aplicação com Angular + THF no fluig.

Essa técnica consiste em criar um *layout* e adicionar uma aplicação angular dentro dele. Posteriormente podemos criar ou editar uma página e adicionar ele *layout* nela.

Abaixo estão os passos necessários para realizar essa técnica com todas as configurações necessárias.


## Pré requisitos

- Node 10.15.x
- NPM 6.4.x
- Angular CLI: 7.1.3


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

Configuração final:

```xml
<plugin>
  <groupId>com.github.eirslett</groupId>
  <artifactId>frontend-maven-plugin</artifactId>
  <executions>
    <execution>
      <id>install node and npm</id>
      <goals>
        <goal>install-node-and-npm</goal>
      </goals>
      <phase>generate-resources</phase>
    </execution>
    <execution>
      <id>npm set registry</id>
      <goals>
        <goal>npm</goal>
      </goals>
      <configuration>
        <arguments>set registry http://nexus.fluig.com/repository/npm-group/</arguments>
      </configuration>
    </execution>
    <execution>
      <id>npm install</id>
      <goals>
        <goal>npm</goal>
      </goals>
      <configuration>
        <arguments>install</arguments>
      </configuration>
    </execution>
    <execution>
      <id>npm run</id>
      <goals>
        <goal>npm</goal>
      </goals>
      <configuration>
        <arguments>run build-prod</arguments>
      </configuration>
    </execution>
  </executions>
  <configuration>
    <nodeVersion>v10.15.2</nodeVersion>
    <workingDirectory>src/main/universo-totvs-app</workingDirectory>
  </configuration>
</plugin>
```


### Passo 4 - Configurando APP Angular

Commit: [Configurando outputPath e deployUrl para funcionamento no layout.](https://github.com/fluig/app-angular-thf/commit/5bc26ab8bbaaa68ba72f8c6b444558b75678001c)


### Passo 5 - Configurando APP para Paths dinâmicos

Commit: [Configurando APP para funcionar em paths dinâmicos.](https://github.com/fluig/app-angular-thf/commit/7c48b71d7af56d739b0feb3f3596ef0a4b3ad840)


### Passo 6 - Configurando view.ftl

Commit: [Adicionando tag principal e bundles do app no view.ftl do layout.](https://github.com/fluig/app-angular-thf/commit/ce738216ba9d74499a928e47b3d91abd08eb6a93)


### Passo 7 - Adicionando THF na aplicação

Commit: [Adicionando THF na aplicação.](https://github.com/fluig/app-angular-thf/commit/9c306cdec8f57e2b8a91769afffbe756b86d7e64)
