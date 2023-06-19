---
title: Almacenamiento en Solidity
id: almacenamiento-en-solidity
date: '2022-10-19'
authors:
  - Fran

image: /images/src/blog/almacenamiento-en-solidity/almacenamiento-en-solidity-post.webp
image_alt: almacenamiento en solidity
---

En este artículo, vamos a profundizar un poco en el almacenamiento persistente en blockchains EVM[^1] compatibles. En otros lenguajes, no es necesario conocer qué sucede a bajo nivel para poder hacer código eficiente, en el caso de Solidity (que no llega a ser un lenguaje de alto nivel) sí que es importante, mas no imprescindible conocer esto, porque las operaciones cuestan **gas**.

El **gas**, es la unidad que mide el cantidad de esfuerzo computacional requerida para ejecutar operaciones en la blockchain. En _Ethereum_, tenemos un modelo transaccional, y cada una de ellas, requiere computo para ejecutarse y validarse, por tanto hay que pagar una comisión (gas). En este fragmento de tabla, podemos ver el costo asociado a cada operación (opcode); vemos que los accesos a **Memory** (MLOAD & MSTORE) son muchísimo más baratos que los accesos al **Storage** (SLOAD & STORE).

| Opcode | Name    | Description            | Extra Info | Gas       |
| ------ | ------- | ---------------------- | ---------- | --------- |
| ...    | ...     | ...                    | -          | ...       |
| 0x51   | MLOAD   | Load word from memory  | -          | 3\*       |
| 0x52   | MSTORE  | Save word to memory    | -          | 3\*       |
| 0x53   | MSTORE8 | Save byte to memory    | -          | 3         |
| 0x54   | SLOAD   | Load word from storage | -          | 800       |
| 0x55   | SSTORE  | Save word to storage   | -          | 20000\*\* |
| ...    | ...     | ...                    | -          | ...       |

Tabla completa: [https://github.com/crytic/evm-opcodes](https://github.com/crytic/evm-opcodes)

## Memory & Storage

A priori hay 2 tipos de almacenamiento en _Solidity_, el volátil (Memory) que podemos verlo como si fuera la memoria RAM, y el persistente (Storage), que podemos mirarlo cómo un disco duro.

- **Memory**: Las variables definidas en el cuerpo de las funciones (contengan o no la palabra clave **memory**) son temporales, sólo existen en el _scope_ de dicha función, y al terminar la ejecución éstas se borran hasta la siguiente ejecución, que se vuelve a reservar un espacio de almacenamiento.

```solidity
contract Foo {
  // Variables de estado
  uint8[] foo;

  function bar(string memory _bar, bool _foo) public {
    // Variables de memoria
    uint8 baz = 10;
    // Copia de foo, las modificaciones de _baz no afectan al estado de foo
    uint8[] memory _baz = foo;
  }
}
```

- **Storage**: Las variables definidas fuera de las funciones, consideran por defecto variables persistentes (llamadas variables de estado). Éstas persisten en la blockchain.

```solidity
contract Foo {
// Variables de estado
uint8[] foo;

    	function bar() public {
    	    // Puntero a foo, las modificaciones de _baz afectan al estado de foo
    	    uint8[] storage _baz = foo;
        }
    }
```

## Storage & SmartContracts

Todos los SmartContracts que corren en la EVM, tienen un Storage permanente asociado, cada uno forma parte del estado global de la blockchain. Este _Storage_, se puede ver como una lista de pares `clave-valor` ordenadas por su declaración en el SmartContract, donde cada elemento de la lista, es de 32 bytes y cuyo tamaño total es de 2^256. Es suficientemente grande para almacenar cualquier cosa, pero inicialmente está todo a 0 y por eso no cuesta nada. En Ethereum, se paga por todo lo que no es 0 y por ampliaciones de memoria.

Así es, en este lenguaje **es relevante el orden en que se declaran las variables**, no se suelen agrupar por dominio u otros criterios, sino por tamaño y tipo para facilitarle el trabajo a la EVM.

Veamos este contrato:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract StoragePlayground {
// Variables de estado
uint256 favNumber; // Posición 0 del Storage
bool someBool; // Posición 1 del Storage

constructor() {
favNumber = 5;
someBool = true;
}
}
```

Para inspeccionar el estado del _Storage_, podemos utilizar la function [getStorageAt](https://docs.ethers.io/v5/api/providers/provider/#Provider-getStorageAt) que nos da el proveedor (en este caso usaremos ethers), le pasamos la dirección de un contrato y el slot de memoria del dato que queremos obtener.

```javascript
// Pseudo código para desplegar el contrato en local
function deployContract() {
  console.log('Deploying StoragePlayground...');
  const contrato = await deploy('StoragePlayground', {...});

  for (let slot = 0; slot < 5; slot++) {
    let contenido = await ethers.provider.getStorageAt(contrato.address,slot)
    console.log(`${slot} -> ${contenido}`)
  }
}
```

Esto nos imprime en consola las 5 primeras posiciones de memoria en el Storage.

```javascript
0 -> 0x0000000000000000000000000000000000000000000000000000000000000005
1 -> 0x0000000000000000000000000000000000000000000000000000000000000001
2 -> 0x0000000000000000000000000000000000000000000000000000000000000000
3 -> 0x0000000000000000000000000000000000000000000000000000000000000000
4 -> 0x0000000000000000000000000000000000000000000000000000000000000000

```

Y tal y como esperábamos, el 5 se guardó en la posición 0 y el True en la posición 1.

Si hacemos una prueba con tipos de dato más pequeños, podemos ver como comparten un slot de memoria. Por ejemplo si reemplazamos `uint256 favNumber` por `uint8 favNumber` produce:

```javascript
0 -> 0x0000000000000000000000000000000000000000000000000000000000000105
1 -> 0x0000000000000000000000000000000000000000000000000000000000000000
2 -> 0x0000000000000000000000000000000000000000000000000000000000000000
3 -> 0x0000000000000000000000000000000000000000000000000000000000000000
4 -> 0x0000000000000000000000000000000000000000000000000000000000000000
```

Vemos que se tiene que tener en cuenta el tamaño y tipo de las variables. En la documentación de Solidity vienen definidas [las reglas](https://docs.soliditylang.org/en/develop/internals/layout_in_storage.html#layout-of-state-variables-in-storage) para declarar variables de manera eficiente.

## Arrays & Mappings

Ahora veamos ejemplos usando arrays (fijos y dinámicos) y mappings[^2].

Los arrays de tamaño fijo se almacenan en posiciones consecutivas. Podemos comprobarlo con el mismo método de antes:

```solidity
contract StoragePlayground {
// Variables de estado
uint256 favNumber; // Posición 0 del Storage
bool someBool; // Posición 1 del Storage
uint256[3] myArray; // Posiciones 2,3 y 4

constructor() {
favNumber = 5;
someBool = true;

     myArray = [10, 20, 30];

}
}
```

Vemos que los slots que contienen `0x00..A, 0x00...14 y 0x00...1e` corresponden con los valores en hexadecimal de 10,20 y 30.

```javascript
0 -> 0x0000000000000000000000000000000000000000000000000000000000000005
1 -> 0x0000000000000000000000000000000000000000000000000000000000000001
2 -> 0x000000000000000000000000000000000000000000000000000000000000000a
3 -> 0x0000000000000000000000000000000000000000000000000000000000000014
4 -> 0x000000000000000000000000000000000000000000000000000000000000001e

```

¿Y qué pasa con los arrays dinámicos? ¿Cómo sabe la EVM cuántos slots reservar entre variables?

Pues no lo sabe 😅, y para solucionarlo utiliza una función de hash `keccak256`, para encontrar una posición de memoria y no sobreescribir otros slots. Cambiemos un poco el código para meter un array dinámico. Reemplazamos `uint256[3] myArray` con `uint256[] myArray`. El resto de código queda igual insertando los mismos 3 elementos.

```javascript
0 -> 0x0000000000000000000000000000000000000000000000000000000000000005
1 -> 0x0000000000000000000000000000000000000000000000000000000000000001
2 -> 0x0000000000000000000000000000000000000000000000000000000000000003
3 -> 0x0000000000000000000000000000000000000000000000000000000000000000
4 -> 0x0000000000000000000000000000000000000000000000000000000000000000
```

Vemos que han desaparecido, pero en la posición 2 tenemos guardado el número 3, este número es la longitud del array y se va actualizando a medida que se insertan elementos, pero lo que no cambia es el slot donde está, sigue siendo el 2. Para calcular la posición a partir de la cual se guardan los datos del array, se utiliza la función `keccak256(slot-donde-esta-la-longitud-del-array)` . Ethers nos provee dicha función:

Sabemos que está en la posición 2 (0x2 en hexadecimal), con `hexZeroPad` lo que hacemos es rellenar con 0 a la izquierda hasta llegar a 32 bytes (64 ceros).

```typescript
const slotDelTamanoDelArray = ethers.utils.hexZeroPad('0x2', 32);
// 0x0000000000000000000000000000000000000000000000000000000000000002
const slotDelPrimerElemento = ethers.utils.keccak256(slotDelTamanoDelArray);
// 0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace
```

Ahora, si llamamos a `getStorageAt` con ese slot, obtendremos el primer dato del array:

```typescript
let contenido = await ethers.provider.getStorageAt(contrato.address, slotDelPrimerElemento);
// 0x000000000000000000000000000000000000000000000000000000000000000a
```

Si lo pasamos a decimal A = 10, ¡nuestro primer elemento! ahora los siguientes elementos están en orden secuencial, es decir, si sumamos 1 a la posición del primero, nos encontraremos con el segundo.

```typescript
// 0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace
// + 1
// 0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf
// ^
const slotDelSegundoElemento = '0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf';
contenido = await ethers.provider.getStorageAt(contrato.address, slotDelSegundoElemento);
// 0x0000000000000000000000000000000000000000000000000000000000000014
```

Que si lo pasamos a decimal nos da 20. Y el tercer dato estará en la siguiente:

```typescript
// 0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf
// +1
// 0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad0
// ^^
```

Por último, veremos un ejemplo con los mappings.

```solidity
contract StoragePlayground {
// Variables de estado
uint256 favNumber; // Posición 0 del Storage
bool someBool; // Posición 1 del Storage
mapping(uint256 => bool) dictionary; // Posición 2
address private someAddress; // Posición 3

constructor() {
favNumber = 5;
someBool = true;
someAddress = 0xaA3052db3062D60643682B1272d00A6BF4A6f5E6;
dictionary[10] = true;
dictionary[20] = false;
dictionary[30] = true;
}
}
```

En este output, vemos que el slot 2 está completamente vacío, a diferencia del array dinámico, aquí no se guarda la longitud del mapping porque no es iterable, y sus claves no tienen porque ser consecutivas.

```javascript
0 -> 0x0000000000000000000000000000000000000000000000000000000000000005
1 -> 0x0000000000000000000000000000000000000000000000000000000000000001
2 -> 0x0000000000000000000000000000000000000000000000000000000000000000
3 -> 0x000000000000000000000000aa3052db3062d60643682b1272d00a6bf4a6f5e6
4 -> 0x0000000000000000000000000000000000000000000000000000000000000000

```

Sin embargo, para calcular la posición de memoria donde guardar los datos, hace algo similar que los arrays. En este caso, la [fórmula a aplicar es esta](https://docs.soliditylang.org/en/develop/internals/layout_in_storage.html#mappings-and-dynamic-arrays): `keccak256(h(k) . p)` donde `h` es una función basada en el tipo de la clave, `k` es la clave del diccionario, `p` es el slot de memoria del mapping y `.` es la concatenación de ambas.

```typescript
// Entonces convertimos a hexadecimal la posicion 2 y la clave del diccionario
// Si k fuera de un tipo distinto a uint la funcion h es diferente
const p = ethers.utils.hexZeroPad('0x2', 32);
const claveEnHex = ethers.BigNumber.from(10).toHexString();
const h*k* = ethers.utils.hexZeroPad(claveEnHex, 32);

// Concatenamos
const concat = ethers.utils.concat([h_k_, p]);

// Y aplicamos la función de hash
const concatHash = ethers.utils.keccak256(concat);

// Pedimos el dato
const valor = await ethers.provider.getStorageAt(contrato.address,concatHash);

// Este sería el output del concatHash y el valor para las 3 claves
// dictionary[10] = true
// 0xd3604db978f6137b0d18816b77b2ce810487a3af08a922e0b184963be5f3adfc
// 0x0000000000000000000000000000000000000000000000000000000000000001

// dictionary[20] = false
// 0x50d9dffd10eb4437a15e8bb1c50afee98ea231805f136fb9a057e7aaeec448ae
// 0x0000000000000000000000000000000000000000000000000000000000000000

// dictionary[30] = true
// 0x6ea47ca2f9e3a67b0e336c514aa9f125109f49309b7162caec32e7d27e5c838c
// 0x0000000000000000000000000000000000000000000000000000000000000001
```

## getStorageAt

Como curiosidad de esta función, (ya hemos visto para lo que sirve), nos permite acceder al contenido de un slot de memoria del storage. Si le das una vuelta, te das cuenta que puedes verlo todo, siempre y cuando tengas acceso al contrato, podrás ver en qué slot va guardado algo.

Como se ve en el último ejemplo, hay variables públicas (por defecto) y privadas (las que llevan `private` por delante), así que usando esta función, puedes verlas todas si tienes acceso al código del contrato y simplemente cuentas en qué slot está definida la variable.

## Recursos

[Playground de keccak256](https://emn178.github.io/online-tools/keccak_256.html)

[Conversor de hex-decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html)

[Documentacion de solidity](https://docs.soliditylang.org/en/develop/internals/layout_in_storage.html#layout-of-state-variables-in-storage)

[Documentacion de ethers.utils](https://docs.ethers.io/v4/api-utils.html#)

[Repositorio de ayuda](https://github.com/PatrickAlphaC/hardhat-fund-me-fcc)

[Post de Adrian Hetman](https://www.adrianhetman.com/unboxing-evm-storage/)

### Notas

[^1]: Ethereum Virtual Machine. Es una entidad sustentada por los nodos que conforman la red. Podemos verla como una máquina de estado distribuida. No comparte recursos en cuanto a potencia de cómputo con otros nodos, pero sí comparte el estado global. Es capaz de ejectuar código.
[^2]: Es un diccionario clave-valor, no es iterable y su tamaño es dinámico. Su sintaxis es **(\<tipo-clave\> ⇒ \<tipo-valor\>) nombre-de-variable**. Los mappings pueden ser anidados.
