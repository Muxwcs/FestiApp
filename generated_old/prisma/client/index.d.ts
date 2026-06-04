
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Sector
 * 
 */
export type Sector = $Result.DefaultSelection<Prisma.$SectorPayload>
/**
 * Model SectorReferent
 * 
 */
export type SectorReferent = $Result.DefaultSelection<Prisma.$SectorReferentPayload>
/**
 * Model Timeslot
 * 
 */
export type Timeslot = $Result.DefaultSelection<Prisma.$TimeslotPayload>
/**
 * Model Affectation
 * 
 */
export type Affectation = $Result.DefaultSelection<Prisma.$AffectationPayload>
/**
 * Model Mission
 * 
 */
export type Mission = $Result.DefaultSelection<Prisma.$MissionPayload>
/**
 * Model MissionAssignment
 * 
 */
export type MissionAssignment = $Result.DefaultSelection<Prisma.$MissionAssignmentPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Price
 * 
 */
export type Price = $Result.DefaultSelection<Prisma.$PricePayload>
/**
 * Model UsefulInfo
 * 
 */
export type UsefulInfo = $Result.DefaultSelection<Prisma.$UsefulInfoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  BENEVOLE: 'BENEVOLE'
};

export type Role = (typeof Role)[keyof typeof Role]


export const AffectationStatus: {
  VALIDE: 'VALIDE',
  EN_ATTENTE: 'EN_ATTENTE',
  REFUSE: 'REFUSE'
};

export type AffectationStatus = (typeof AffectationStatus)[keyof typeof AffectationStatus]


export const MissionPriority: {
  HAUTE: 'HAUTE',
  MOYENNE: 'MOYENNE',
  BASSE: 'BASSE'
};

export type MissionPriority = (typeof MissionPriority)[keyof typeof MissionPriority]


export const MissionStatus: {
  A_FAIRE: 'A_FAIRE',
  EN_COURS: 'EN_COURS',
  TERMINEE: 'TERMINEE'
};

export type MissionStatus = (typeof MissionStatus)[keyof typeof MissionStatus]


export const EventCategory: {
  CONCERT: 'CONCERT',
  ANIMATION: 'ANIMATION',
  RESTAURATION: 'RESTAURATION',
  INFO: 'INFO'
};

export type EventCategory = (typeof EventCategory)[keyof typeof EventCategory]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type AffectationStatus = $Enums.AffectationStatus

export const AffectationStatus: typeof $Enums.AffectationStatus

export type MissionPriority = $Enums.MissionPriority

export const MissionPriority: typeof $Enums.MissionPriority

export type MissionStatus = $Enums.MissionStatus

export const MissionStatus: typeof $Enums.MissionStatus

export type EventCategory = $Enums.EventCategory

export const EventCategory: typeof $Enums.EventCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sector`: Exposes CRUD operations for the **Sector** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sectors
    * const sectors = await prisma.sector.findMany()
    * ```
    */
  get sector(): Prisma.SectorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sectorReferent`: Exposes CRUD operations for the **SectorReferent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SectorReferents
    * const sectorReferents = await prisma.sectorReferent.findMany()
    * ```
    */
  get sectorReferent(): Prisma.SectorReferentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.timeslot`: Exposes CRUD operations for the **Timeslot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Timeslots
    * const timeslots = await prisma.timeslot.findMany()
    * ```
    */
  get timeslot(): Prisma.TimeslotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affectation`: Exposes CRUD operations for the **Affectation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Affectations
    * const affectations = await prisma.affectation.findMany()
    * ```
    */
  get affectation(): Prisma.AffectationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mission`: Exposes CRUD operations for the **Mission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Missions
    * const missions = await prisma.mission.findMany()
    * ```
    */
  get mission(): Prisma.MissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.missionAssignment`: Exposes CRUD operations for the **MissionAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MissionAssignments
    * const missionAssignments = await prisma.missionAssignment.findMany()
    * ```
    */
  get missionAssignment(): Prisma.MissionAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.price`: Exposes CRUD operations for the **Price** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prices
    * const prices = await prisma.price.findMany()
    * ```
    */
  get price(): Prisma.PriceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usefulInfo`: Exposes CRUD operations for the **UsefulInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsefulInfos
    * const usefulInfos = await prisma.usefulInfo.findMany()
    * ```
    */
  get usefulInfo(): Prisma.UsefulInfoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Sector: 'Sector',
    SectorReferent: 'SectorReferent',
    Timeslot: 'Timeslot',
    Affectation: 'Affectation',
    Mission: 'Mission',
    MissionAssignment: 'MissionAssignment',
    Event: 'Event',
    Price: 'Price',
    UsefulInfo: 'UsefulInfo'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "sector" | "sectorReferent" | "timeslot" | "affectation" | "mission" | "missionAssignment" | "event" | "price" | "usefulInfo"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Sector: {
        payload: Prisma.$SectorPayload<ExtArgs>
        fields: Prisma.SectorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          findFirst: {
            args: Prisma.SectorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          findMany: {
            args: Prisma.SectorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>[]
          }
          create: {
            args: Prisma.SectorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          createMany: {
            args: Prisma.SectorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SectorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>[]
          }
          delete: {
            args: Prisma.SectorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          update: {
            args: Prisma.SectorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          deleteMany: {
            args: Prisma.SectorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SectorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>[]
          }
          upsert: {
            args: Prisma.SectorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          aggregate: {
            args: Prisma.SectorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSector>
          }
          groupBy: {
            args: Prisma.SectorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectorGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectorCountArgs<ExtArgs>
            result: $Utils.Optional<SectorCountAggregateOutputType> | number
          }
        }
      }
      SectorReferent: {
        payload: Prisma.$SectorReferentPayload<ExtArgs>
        fields: Prisma.SectorReferentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectorReferentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectorReferentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload>
          }
          findFirst: {
            args: Prisma.SectorReferentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectorReferentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload>
          }
          findMany: {
            args: Prisma.SectorReferentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload>[]
          }
          create: {
            args: Prisma.SectorReferentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload>
          }
          createMany: {
            args: Prisma.SectorReferentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SectorReferentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload>[]
          }
          delete: {
            args: Prisma.SectorReferentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload>
          }
          update: {
            args: Prisma.SectorReferentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload>
          }
          deleteMany: {
            args: Prisma.SectorReferentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectorReferentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SectorReferentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload>[]
          }
          upsert: {
            args: Prisma.SectorReferentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorReferentPayload>
          }
          aggregate: {
            args: Prisma.SectorReferentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSectorReferent>
          }
          groupBy: {
            args: Prisma.SectorReferentGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectorReferentGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectorReferentCountArgs<ExtArgs>
            result: $Utils.Optional<SectorReferentCountAggregateOutputType> | number
          }
        }
      }
      Timeslot: {
        payload: Prisma.$TimeslotPayload<ExtArgs>
        fields: Prisma.TimeslotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimeslotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimeslotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          findFirst: {
            args: Prisma.TimeslotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimeslotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          findMany: {
            args: Prisma.TimeslotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>[]
          }
          create: {
            args: Prisma.TimeslotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          createMany: {
            args: Prisma.TimeslotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimeslotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>[]
          }
          delete: {
            args: Prisma.TimeslotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          update: {
            args: Prisma.TimeslotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          deleteMany: {
            args: Prisma.TimeslotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimeslotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TimeslotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>[]
          }
          upsert: {
            args: Prisma.TimeslotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimeslotPayload>
          }
          aggregate: {
            args: Prisma.TimeslotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimeslot>
          }
          groupBy: {
            args: Prisma.TimeslotGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimeslotGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimeslotCountArgs<ExtArgs>
            result: $Utils.Optional<TimeslotCountAggregateOutputType> | number
          }
        }
      }
      Affectation: {
        payload: Prisma.$AffectationPayload<ExtArgs>
        fields: Prisma.AffectationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffectationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffectationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload>
          }
          findFirst: {
            args: Prisma.AffectationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffectationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload>
          }
          findMany: {
            args: Prisma.AffectationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload>[]
          }
          create: {
            args: Prisma.AffectationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload>
          }
          createMany: {
            args: Prisma.AffectationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffectationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload>[]
          }
          delete: {
            args: Prisma.AffectationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload>
          }
          update: {
            args: Prisma.AffectationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload>
          }
          deleteMany: {
            args: Prisma.AffectationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffectationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffectationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload>[]
          }
          upsert: {
            args: Prisma.AffectationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffectationPayload>
          }
          aggregate: {
            args: Prisma.AffectationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffectation>
          }
          groupBy: {
            args: Prisma.AffectationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffectationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffectationCountArgs<ExtArgs>
            result: $Utils.Optional<AffectationCountAggregateOutputType> | number
          }
        }
      }
      Mission: {
        payload: Prisma.$MissionPayload<ExtArgs>
        fields: Prisma.MissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          findFirst: {
            args: Prisma.MissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          findMany: {
            args: Prisma.MissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>[]
          }
          create: {
            args: Prisma.MissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          createMany: {
            args: Prisma.MissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>[]
          }
          delete: {
            args: Prisma.MissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          update: {
            args: Prisma.MissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          deleteMany: {
            args: Prisma.MissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>[]
          }
          upsert: {
            args: Prisma.MissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          aggregate: {
            args: Prisma.MissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMission>
          }
          groupBy: {
            args: Prisma.MissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MissionCountArgs<ExtArgs>
            result: $Utils.Optional<MissionCountAggregateOutputType> | number
          }
        }
      }
      MissionAssignment: {
        payload: Prisma.$MissionAssignmentPayload<ExtArgs>
        fields: Prisma.MissionAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MissionAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MissionAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload>
          }
          findFirst: {
            args: Prisma.MissionAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MissionAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload>
          }
          findMany: {
            args: Prisma.MissionAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload>[]
          }
          create: {
            args: Prisma.MissionAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload>
          }
          createMany: {
            args: Prisma.MissionAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MissionAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload>[]
          }
          delete: {
            args: Prisma.MissionAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload>
          }
          update: {
            args: Prisma.MissionAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.MissionAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MissionAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MissionAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.MissionAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionAssignmentPayload>
          }
          aggregate: {
            args: Prisma.MissionAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMissionAssignment>
          }
          groupBy: {
            args: Prisma.MissionAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<MissionAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.MissionAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<MissionAssignmentCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Price: {
        payload: Prisma.$PricePayload<ExtArgs>
        fields: Prisma.PriceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          findFirst: {
            args: Prisma.PriceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          findMany: {
            args: Prisma.PriceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>[]
          }
          create: {
            args: Prisma.PriceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          createMany: {
            args: Prisma.PriceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>[]
          }
          delete: {
            args: Prisma.PriceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          update: {
            args: Prisma.PriceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          deleteMany: {
            args: Prisma.PriceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>[]
          }
          upsert: {
            args: Prisma.PriceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          aggregate: {
            args: Prisma.PriceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrice>
          }
          groupBy: {
            args: Prisma.PriceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceCountArgs<ExtArgs>
            result: $Utils.Optional<PriceCountAggregateOutputType> | number
          }
        }
      }
      UsefulInfo: {
        payload: Prisma.$UsefulInfoPayload<ExtArgs>
        fields: Prisma.UsefulInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsefulInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsefulInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload>
          }
          findFirst: {
            args: Prisma.UsefulInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsefulInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload>
          }
          findMany: {
            args: Prisma.UsefulInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload>[]
          }
          create: {
            args: Prisma.UsefulInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload>
          }
          createMany: {
            args: Prisma.UsefulInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsefulInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload>[]
          }
          delete: {
            args: Prisma.UsefulInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload>
          }
          update: {
            args: Prisma.UsefulInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload>
          }
          deleteMany: {
            args: Prisma.UsefulInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsefulInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsefulInfoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload>[]
          }
          upsert: {
            args: Prisma.UsefulInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsefulInfoPayload>
          }
          aggregate: {
            args: Prisma.UsefulInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsefulInfo>
          }
          groupBy: {
            args: Prisma.UsefulInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsefulInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsefulInfoCountArgs<ExtArgs>
            result: $Utils.Optional<UsefulInfoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    sector?: SectorOmit
    sectorReferent?: SectorReferentOmit
    timeslot?: TimeslotOmit
    affectation?: AffectationOmit
    mission?: MissionOmit
    missionAssignment?: MissionAssignmentOmit
    event?: EventOmit
    price?: PriceOmit
    usefulInfo?: UsefulInfoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    affectations: number
    missionAssignments: number
    referentSectors: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affectations?: boolean | UserCountOutputTypeCountAffectationsArgs
    missionAssignments?: boolean | UserCountOutputTypeCountMissionAssignmentsArgs
    referentSectors?: boolean | UserCountOutputTypeCountReferentSectorsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAffectationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffectationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMissionAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MissionAssignmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReferentSectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectorReferentWhereInput
  }


  /**
   * Count Type SectorCountOutputType
   */

  export type SectorCountOutputType = {
    timeslots: number
    affectations: number
    referents: number
  }

  export type SectorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeslots?: boolean | SectorCountOutputTypeCountTimeslotsArgs
    affectations?: boolean | SectorCountOutputTypeCountAffectationsArgs
    referents?: boolean | SectorCountOutputTypeCountReferentsArgs
  }

  // Custom InputTypes
  /**
   * SectorCountOutputType without action
   */
  export type SectorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorCountOutputType
     */
    select?: SectorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SectorCountOutputType without action
   */
  export type SectorCountOutputTypeCountTimeslotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeslotWhereInput
  }

  /**
   * SectorCountOutputType without action
   */
  export type SectorCountOutputTypeCountAffectationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffectationWhereInput
  }

  /**
   * SectorCountOutputType without action
   */
  export type SectorCountOutputTypeCountReferentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectorReferentWhereInput
  }


  /**
   * Count Type TimeslotCountOutputType
   */

  export type TimeslotCountOutputType = {
    affectations: number
  }

  export type TimeslotCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affectations?: boolean | TimeslotCountOutputTypeCountAffectationsArgs
  }

  // Custom InputTypes
  /**
   * TimeslotCountOutputType without action
   */
  export type TimeslotCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimeslotCountOutputType
     */
    select?: TimeslotCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TimeslotCountOutputType without action
   */
  export type TimeslotCountOutputTypeCountAffectationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffectationWhereInput
  }


  /**
   * Count Type MissionCountOutputType
   */

  export type MissionCountOutputType = {
    assignments: number
  }

  export type MissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | MissionCountOutputTypeCountAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * MissionCountOutputType without action
   */
  export type MissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionCountOutputType
     */
    select?: MissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MissionCountOutputType without action
   */
  export type MissionCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MissionAssignmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    failedLoginAttempts: number | null
  }

  export type UserSumAggregateOutputType = {
    failedLoginAttempts: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    firstname: string | null
    surname: string | null
    phone: string | null
    role: $Enums.Role | null
    isReferent: boolean | null
    isActive: boolean | null
    status: string | null
    avatar: string | null
    notes: string | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    lastLoginAt: Date | null
    lastLoginIp: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    firstname: string | null
    surname: string | null
    phone: string | null
    role: $Enums.Role | null
    isReferent: boolean | null
    isActive: boolean | null
    status: string | null
    avatar: string | null
    notes: string | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    lastLoginAt: Date | null
    lastLoginIp: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    firstname: number
    surname: number
    phone: number
    role: number
    isReferent: number
    isActive: number
    status: number
    avatar: number
    notes: number
    skills: number
    availability: number
    failedLoginAttempts: number
    lockedUntil: number
    lastLoginAt: number
    lastLoginIp: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    failedLoginAttempts?: true
  }

  export type UserSumAggregateInputType = {
    failedLoginAttempts?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    firstname?: true
    surname?: true
    phone?: true
    role?: true
    isReferent?: true
    isActive?: true
    status?: true
    avatar?: true
    notes?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    lastLoginAt?: true
    lastLoginIp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    firstname?: true
    surname?: true
    phone?: true
    role?: true
    isReferent?: true
    isActive?: true
    status?: true
    avatar?: true
    notes?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    lastLoginAt?: true
    lastLoginIp?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    firstname?: true
    surname?: true
    phone?: true
    role?: true
    isReferent?: true
    isActive?: true
    status?: true
    avatar?: true
    notes?: true
    skills?: true
    availability?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    lastLoginAt?: true
    lastLoginIp?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    firstname: string | null
    surname: string | null
    phone: string | null
    role: $Enums.Role
    isReferent: boolean
    isActive: boolean
    status: string | null
    avatar: string | null
    notes: string | null
    skills: string[]
    availability: string[]
    failedLoginAttempts: number
    lockedUntil: Date | null
    lastLoginAt: Date | null
    lastLoginIp: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    firstname?: boolean
    surname?: boolean
    phone?: boolean
    role?: boolean
    isReferent?: boolean
    isActive?: boolean
    status?: boolean
    avatar?: boolean
    notes?: boolean
    skills?: boolean
    availability?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    lastLoginIp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    affectations?: boolean | User$affectationsArgs<ExtArgs>
    missionAssignments?: boolean | User$missionAssignmentsArgs<ExtArgs>
    referentSectors?: boolean | User$referentSectorsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    firstname?: boolean
    surname?: boolean
    phone?: boolean
    role?: boolean
    isReferent?: boolean
    isActive?: boolean
    status?: boolean
    avatar?: boolean
    notes?: boolean
    skills?: boolean
    availability?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    lastLoginIp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    firstname?: boolean
    surname?: boolean
    phone?: boolean
    role?: boolean
    isReferent?: boolean
    isActive?: boolean
    status?: boolean
    avatar?: boolean
    notes?: boolean
    skills?: boolean
    availability?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    lastLoginIp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    firstname?: boolean
    surname?: boolean
    phone?: boolean
    role?: boolean
    isReferent?: boolean
    isActive?: boolean
    status?: boolean
    avatar?: boolean
    notes?: boolean
    skills?: boolean
    availability?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    lastLoginAt?: boolean
    lastLoginIp?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "firstname" | "surname" | "phone" | "role" | "isReferent" | "isActive" | "status" | "avatar" | "notes" | "skills" | "availability" | "failedLoginAttempts" | "lockedUntil" | "lastLoginAt" | "lastLoginIp" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affectations?: boolean | User$affectationsArgs<ExtArgs>
    missionAssignments?: boolean | User$missionAssignmentsArgs<ExtArgs>
    referentSectors?: boolean | User$referentSectorsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      affectations: Prisma.$AffectationPayload<ExtArgs>[]
      missionAssignments: Prisma.$MissionAssignmentPayload<ExtArgs>[]
      referentSectors: Prisma.$SectorReferentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      firstname: string | null
      surname: string | null
      phone: string | null
      role: $Enums.Role
      isReferent: boolean
      isActive: boolean
      status: string | null
      avatar: string | null
      notes: string | null
      skills: string[]
      availability: string[]
      failedLoginAttempts: number
      lockedUntil: Date | null
      lastLoginAt: Date | null
      lastLoginIp: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    affectations<T extends User$affectationsArgs<ExtArgs> = {}>(args?: Subset<T, User$affectationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    missionAssignments<T extends User$missionAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$missionAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    referentSectors<T extends User$referentSectorsArgs<ExtArgs> = {}>(args?: Subset<T, User$referentSectorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly firstname: FieldRef<"User", 'String'>
    readonly surname: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isReferent: FieldRef<"User", 'Boolean'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly status: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly notes: FieldRef<"User", 'String'>
    readonly skills: FieldRef<"User", 'String[]'>
    readonly availability: FieldRef<"User", 'String[]'>
    readonly failedLoginAttempts: FieldRef<"User", 'Int'>
    readonly lockedUntil: FieldRef<"User", 'DateTime'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly lastLoginIp: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.affectations
   */
  export type User$affectationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    where?: AffectationWhereInput
    orderBy?: AffectationOrderByWithRelationInput | AffectationOrderByWithRelationInput[]
    cursor?: AffectationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffectationScalarFieldEnum | AffectationScalarFieldEnum[]
  }

  /**
   * User.missionAssignments
   */
  export type User$missionAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    where?: MissionAssignmentWhereInput
    orderBy?: MissionAssignmentOrderByWithRelationInput | MissionAssignmentOrderByWithRelationInput[]
    cursor?: MissionAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MissionAssignmentScalarFieldEnum | MissionAssignmentScalarFieldEnum[]
  }

  /**
   * User.referentSectors
   */
  export type User$referentSectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    where?: SectorReferentWhereInput
    orderBy?: SectorReferentOrderByWithRelationInput | SectorReferentOrderByWithRelationInput[]
    cursor?: SectorReferentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectorReferentScalarFieldEnum | SectorReferentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Sector
   */

  export type AggregateSector = {
    _count: SectorCountAggregateOutputType | null
    _min: SectorMinAggregateOutputType | null
    _max: SectorMaxAggregateOutputType | null
  }

  export type SectorMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    color: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SectorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    color: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SectorCountAggregateOutputType = {
    id: number
    name: number
    description: number
    color: number
    status: number
    skills: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SectorMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SectorMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SectorCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    color?: true
    status?: true
    skills?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SectorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sector to aggregate.
     */
    where?: SectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sectors to fetch.
     */
    orderBy?: SectorOrderByWithRelationInput | SectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sectors
    **/
    _count?: true | SectorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectorMaxAggregateInputType
  }

  export type GetSectorAggregateType<T extends SectorAggregateArgs> = {
        [P in keyof T & keyof AggregateSector]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSector[P]>
      : GetScalarType<T[P], AggregateSector[P]>
  }




  export type SectorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectorWhereInput
    orderBy?: SectorOrderByWithAggregationInput | SectorOrderByWithAggregationInput[]
    by: SectorScalarFieldEnum[] | SectorScalarFieldEnum
    having?: SectorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectorCountAggregateInputType | true
    _min?: SectorMinAggregateInputType
    _max?: SectorMaxAggregateInputType
  }

  export type SectorGroupByOutputType = {
    id: string
    name: string
    description: string | null
    color: string | null
    status: string | null
    skills: string[]
    createdAt: Date
    updatedAt: Date
    _count: SectorCountAggregateOutputType | null
    _min: SectorMinAggregateOutputType | null
    _max: SectorMaxAggregateOutputType | null
  }

  type GetSectorGroupByPayload<T extends SectorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectorGroupByOutputType[P]>
            : GetScalarType<T[P], SectorGroupByOutputType[P]>
        }
      >
    >


  export type SectorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    status?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    timeslots?: boolean | Sector$timeslotsArgs<ExtArgs>
    affectations?: boolean | Sector$affectationsArgs<ExtArgs>
    referents?: boolean | Sector$referentsArgs<ExtArgs>
    _count?: boolean | SectorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sector"]>

  export type SectorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    status?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sector"]>

  export type SectorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    status?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sector"]>

  export type SectorSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    color?: boolean
    status?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SectorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "color" | "status" | "skills" | "createdAt" | "updatedAt", ExtArgs["result"]["sector"]>
  export type SectorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timeslots?: boolean | Sector$timeslotsArgs<ExtArgs>
    affectations?: boolean | Sector$affectationsArgs<ExtArgs>
    referents?: boolean | Sector$referentsArgs<ExtArgs>
    _count?: boolean | SectorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SectorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SectorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SectorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sector"
    objects: {
      timeslots: Prisma.$TimeslotPayload<ExtArgs>[]
      affectations: Prisma.$AffectationPayload<ExtArgs>[]
      referents: Prisma.$SectorReferentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      color: string | null
      status: string | null
      skills: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sector"]>
    composites: {}
  }

  type SectorGetPayload<S extends boolean | null | undefined | SectorDefaultArgs> = $Result.GetResult<Prisma.$SectorPayload, S>

  type SectorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectorCountAggregateInputType | true
    }

  export interface SectorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sector'], meta: { name: 'Sector' } }
    /**
     * Find zero or one Sector that matches the filter.
     * @param {SectorFindUniqueArgs} args - Arguments to find a Sector
     * @example
     * // Get one Sector
     * const sector = await prisma.sector.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectorFindUniqueArgs>(args: SelectSubset<T, SectorFindUniqueArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sector that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectorFindUniqueOrThrowArgs} args - Arguments to find a Sector
     * @example
     * // Get one Sector
     * const sector = await prisma.sector.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectorFindUniqueOrThrowArgs>(args: SelectSubset<T, SectorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sector that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorFindFirstArgs} args - Arguments to find a Sector
     * @example
     * // Get one Sector
     * const sector = await prisma.sector.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectorFindFirstArgs>(args?: SelectSubset<T, SectorFindFirstArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sector that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorFindFirstOrThrowArgs} args - Arguments to find a Sector
     * @example
     * // Get one Sector
     * const sector = await prisma.sector.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectorFindFirstOrThrowArgs>(args?: SelectSubset<T, SectorFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sectors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sectors
     * const sectors = await prisma.sector.findMany()
     * 
     * // Get first 10 Sectors
     * const sectors = await prisma.sector.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectorWithIdOnly = await prisma.sector.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectorFindManyArgs>(args?: SelectSubset<T, SectorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sector.
     * @param {SectorCreateArgs} args - Arguments to create a Sector.
     * @example
     * // Create one Sector
     * const Sector = await prisma.sector.create({
     *   data: {
     *     // ... data to create a Sector
     *   }
     * })
     * 
     */
    create<T extends SectorCreateArgs>(args: SelectSubset<T, SectorCreateArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sectors.
     * @param {SectorCreateManyArgs} args - Arguments to create many Sectors.
     * @example
     * // Create many Sectors
     * const sector = await prisma.sector.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectorCreateManyArgs>(args?: SelectSubset<T, SectorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sectors and returns the data saved in the database.
     * @param {SectorCreateManyAndReturnArgs} args - Arguments to create many Sectors.
     * @example
     * // Create many Sectors
     * const sector = await prisma.sector.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sectors and only return the `id`
     * const sectorWithIdOnly = await prisma.sector.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SectorCreateManyAndReturnArgs>(args?: SelectSubset<T, SectorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sector.
     * @param {SectorDeleteArgs} args - Arguments to delete one Sector.
     * @example
     * // Delete one Sector
     * const Sector = await prisma.sector.delete({
     *   where: {
     *     // ... filter to delete one Sector
     *   }
     * })
     * 
     */
    delete<T extends SectorDeleteArgs>(args: SelectSubset<T, SectorDeleteArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sector.
     * @param {SectorUpdateArgs} args - Arguments to update one Sector.
     * @example
     * // Update one Sector
     * const sector = await prisma.sector.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectorUpdateArgs>(args: SelectSubset<T, SectorUpdateArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sectors.
     * @param {SectorDeleteManyArgs} args - Arguments to filter Sectors to delete.
     * @example
     * // Delete a few Sectors
     * const { count } = await prisma.sector.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectorDeleteManyArgs>(args?: SelectSubset<T, SectorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sectors
     * const sector = await prisma.sector.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectorUpdateManyArgs>(args: SelectSubset<T, SectorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sectors and returns the data updated in the database.
     * @param {SectorUpdateManyAndReturnArgs} args - Arguments to update many Sectors.
     * @example
     * // Update many Sectors
     * const sector = await prisma.sector.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sectors and only return the `id`
     * const sectorWithIdOnly = await prisma.sector.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SectorUpdateManyAndReturnArgs>(args: SelectSubset<T, SectorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sector.
     * @param {SectorUpsertArgs} args - Arguments to update or create a Sector.
     * @example
     * // Update or create a Sector
     * const sector = await prisma.sector.upsert({
     *   create: {
     *     // ... data to create a Sector
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sector we want to update
     *   }
     * })
     */
    upsert<T extends SectorUpsertArgs>(args: SelectSubset<T, SectorUpsertArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorCountArgs} args - Arguments to filter Sectors to count.
     * @example
     * // Count the number of Sectors
     * const count = await prisma.sector.count({
     *   where: {
     *     // ... the filter for the Sectors we want to count
     *   }
     * })
    **/
    count<T extends SectorCountArgs>(
      args?: Subset<T, SectorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SectorAggregateArgs>(args: Subset<T, SectorAggregateArgs>): Prisma.PrismaPromise<GetSectorAggregateType<T>>

    /**
     * Group by Sector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SectorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectorGroupByArgs['orderBy'] }
        : { orderBy?: SectorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SectorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sector model
   */
  readonly fields: SectorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sector.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    timeslots<T extends Sector$timeslotsArgs<ExtArgs> = {}>(args?: Subset<T, Sector$timeslotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    affectations<T extends Sector$affectationsArgs<ExtArgs> = {}>(args?: Subset<T, Sector$affectationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    referents<T extends Sector$referentsArgs<ExtArgs> = {}>(args?: Subset<T, Sector$referentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sector model
   */
  interface SectorFieldRefs {
    readonly id: FieldRef<"Sector", 'String'>
    readonly name: FieldRef<"Sector", 'String'>
    readonly description: FieldRef<"Sector", 'String'>
    readonly color: FieldRef<"Sector", 'String'>
    readonly status: FieldRef<"Sector", 'String'>
    readonly skills: FieldRef<"Sector", 'String[]'>
    readonly createdAt: FieldRef<"Sector", 'DateTime'>
    readonly updatedAt: FieldRef<"Sector", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sector findUnique
   */
  export type SectorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sector to fetch.
     */
    where: SectorWhereUniqueInput
  }

  /**
   * Sector findUniqueOrThrow
   */
  export type SectorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sector to fetch.
     */
    where: SectorWhereUniqueInput
  }

  /**
   * Sector findFirst
   */
  export type SectorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sector to fetch.
     */
    where?: SectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sectors to fetch.
     */
    orderBy?: SectorOrderByWithRelationInput | SectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sectors.
     */
    cursor?: SectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sectors.
     */
    distinct?: SectorScalarFieldEnum | SectorScalarFieldEnum[]
  }

  /**
   * Sector findFirstOrThrow
   */
  export type SectorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sector to fetch.
     */
    where?: SectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sectors to fetch.
     */
    orderBy?: SectorOrderByWithRelationInput | SectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sectors.
     */
    cursor?: SectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sectors.
     */
    distinct?: SectorScalarFieldEnum | SectorScalarFieldEnum[]
  }

  /**
   * Sector findMany
   */
  export type SectorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sectors to fetch.
     */
    where?: SectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sectors to fetch.
     */
    orderBy?: SectorOrderByWithRelationInput | SectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sectors.
     */
    cursor?: SectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sectors.
     */
    distinct?: SectorScalarFieldEnum | SectorScalarFieldEnum[]
  }

  /**
   * Sector create
   */
  export type SectorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * The data needed to create a Sector.
     */
    data: XOR<SectorCreateInput, SectorUncheckedCreateInput>
  }

  /**
   * Sector createMany
   */
  export type SectorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sectors.
     */
    data: SectorCreateManyInput | SectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sector createManyAndReturn
   */
  export type SectorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * The data used to create many Sectors.
     */
    data: SectorCreateManyInput | SectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sector update
   */
  export type SectorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * The data needed to update a Sector.
     */
    data: XOR<SectorUpdateInput, SectorUncheckedUpdateInput>
    /**
     * Choose, which Sector to update.
     */
    where: SectorWhereUniqueInput
  }

  /**
   * Sector updateMany
   */
  export type SectorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sectors.
     */
    data: XOR<SectorUpdateManyMutationInput, SectorUncheckedUpdateManyInput>
    /**
     * Filter which Sectors to update
     */
    where?: SectorWhereInput
    /**
     * Limit how many Sectors to update.
     */
    limit?: number
  }

  /**
   * Sector updateManyAndReturn
   */
  export type SectorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * The data used to update Sectors.
     */
    data: XOR<SectorUpdateManyMutationInput, SectorUncheckedUpdateManyInput>
    /**
     * Filter which Sectors to update
     */
    where?: SectorWhereInput
    /**
     * Limit how many Sectors to update.
     */
    limit?: number
  }

  /**
   * Sector upsert
   */
  export type SectorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * The filter to search for the Sector to update in case it exists.
     */
    where: SectorWhereUniqueInput
    /**
     * In case the Sector found by the `where` argument doesn't exist, create a new Sector with this data.
     */
    create: XOR<SectorCreateInput, SectorUncheckedCreateInput>
    /**
     * In case the Sector was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectorUpdateInput, SectorUncheckedUpdateInput>
  }

  /**
   * Sector delete
   */
  export type SectorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter which Sector to delete.
     */
    where: SectorWhereUniqueInput
  }

  /**
   * Sector deleteMany
   */
  export type SectorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sectors to delete
     */
    where?: SectorWhereInput
    /**
     * Limit how many Sectors to delete.
     */
    limit?: number
  }

  /**
   * Sector.timeslots
   */
  export type Sector$timeslotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    where?: TimeslotWhereInput
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    cursor?: TimeslotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimeslotScalarFieldEnum | TimeslotScalarFieldEnum[]
  }

  /**
   * Sector.affectations
   */
  export type Sector$affectationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    where?: AffectationWhereInput
    orderBy?: AffectationOrderByWithRelationInput | AffectationOrderByWithRelationInput[]
    cursor?: AffectationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffectationScalarFieldEnum | AffectationScalarFieldEnum[]
  }

  /**
   * Sector.referents
   */
  export type Sector$referentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    where?: SectorReferentWhereInput
    orderBy?: SectorReferentOrderByWithRelationInput | SectorReferentOrderByWithRelationInput[]
    cursor?: SectorReferentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectorReferentScalarFieldEnum | SectorReferentScalarFieldEnum[]
  }

  /**
   * Sector without action
   */
  export type SectorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
  }


  /**
   * Model SectorReferent
   */

  export type AggregateSectorReferent = {
    _count: SectorReferentCountAggregateOutputType | null
    _min: SectorReferentMinAggregateOutputType | null
    _max: SectorReferentMaxAggregateOutputType | null
  }

  export type SectorReferentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sectorId: string | null
  }

  export type SectorReferentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sectorId: string | null
  }

  export type SectorReferentCountAggregateOutputType = {
    id: number
    userId: number
    sectorId: number
    _all: number
  }


  export type SectorReferentMinAggregateInputType = {
    id?: true
    userId?: true
    sectorId?: true
  }

  export type SectorReferentMaxAggregateInputType = {
    id?: true
    userId?: true
    sectorId?: true
  }

  export type SectorReferentCountAggregateInputType = {
    id?: true
    userId?: true
    sectorId?: true
    _all?: true
  }

  export type SectorReferentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SectorReferent to aggregate.
     */
    where?: SectorReferentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectorReferents to fetch.
     */
    orderBy?: SectorReferentOrderByWithRelationInput | SectorReferentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectorReferentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectorReferents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectorReferents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SectorReferents
    **/
    _count?: true | SectorReferentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectorReferentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectorReferentMaxAggregateInputType
  }

  export type GetSectorReferentAggregateType<T extends SectorReferentAggregateArgs> = {
        [P in keyof T & keyof AggregateSectorReferent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSectorReferent[P]>
      : GetScalarType<T[P], AggregateSectorReferent[P]>
  }




  export type SectorReferentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectorReferentWhereInput
    orderBy?: SectorReferentOrderByWithAggregationInput | SectorReferentOrderByWithAggregationInput[]
    by: SectorReferentScalarFieldEnum[] | SectorReferentScalarFieldEnum
    having?: SectorReferentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectorReferentCountAggregateInputType | true
    _min?: SectorReferentMinAggregateInputType
    _max?: SectorReferentMaxAggregateInputType
  }

  export type SectorReferentGroupByOutputType = {
    id: string
    userId: string
    sectorId: string
    _count: SectorReferentCountAggregateOutputType | null
    _min: SectorReferentMinAggregateOutputType | null
    _max: SectorReferentMaxAggregateOutputType | null
  }

  type GetSectorReferentGroupByPayload<T extends SectorReferentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectorReferentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectorReferentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectorReferentGroupByOutputType[P]>
            : GetScalarType<T[P], SectorReferentGroupByOutputType[P]>
        }
      >
    >


  export type SectorReferentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sectorId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sectorReferent"]>

  export type SectorReferentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sectorId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sectorReferent"]>

  export type SectorReferentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sectorId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sectorReferent"]>

  export type SectorReferentSelectScalar = {
    id?: boolean
    userId?: boolean
    sectorId?: boolean
  }

  export type SectorReferentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sectorId", ExtArgs["result"]["sectorReferent"]>
  export type SectorReferentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }
  export type SectorReferentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }
  export type SectorReferentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }

  export type $SectorReferentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SectorReferent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      sector: Prisma.$SectorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      sectorId: string
    }, ExtArgs["result"]["sectorReferent"]>
    composites: {}
  }

  type SectorReferentGetPayload<S extends boolean | null | undefined | SectorReferentDefaultArgs> = $Result.GetResult<Prisma.$SectorReferentPayload, S>

  type SectorReferentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectorReferentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectorReferentCountAggregateInputType | true
    }

  export interface SectorReferentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SectorReferent'], meta: { name: 'SectorReferent' } }
    /**
     * Find zero or one SectorReferent that matches the filter.
     * @param {SectorReferentFindUniqueArgs} args - Arguments to find a SectorReferent
     * @example
     * // Get one SectorReferent
     * const sectorReferent = await prisma.sectorReferent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectorReferentFindUniqueArgs>(args: SelectSubset<T, SectorReferentFindUniqueArgs<ExtArgs>>): Prisma__SectorReferentClient<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SectorReferent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectorReferentFindUniqueOrThrowArgs} args - Arguments to find a SectorReferent
     * @example
     * // Get one SectorReferent
     * const sectorReferent = await prisma.sectorReferent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectorReferentFindUniqueOrThrowArgs>(args: SelectSubset<T, SectorReferentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectorReferentClient<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SectorReferent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorReferentFindFirstArgs} args - Arguments to find a SectorReferent
     * @example
     * // Get one SectorReferent
     * const sectorReferent = await prisma.sectorReferent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectorReferentFindFirstArgs>(args?: SelectSubset<T, SectorReferentFindFirstArgs<ExtArgs>>): Prisma__SectorReferentClient<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SectorReferent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorReferentFindFirstOrThrowArgs} args - Arguments to find a SectorReferent
     * @example
     * // Get one SectorReferent
     * const sectorReferent = await prisma.sectorReferent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectorReferentFindFirstOrThrowArgs>(args?: SelectSubset<T, SectorReferentFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectorReferentClient<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SectorReferents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorReferentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SectorReferents
     * const sectorReferents = await prisma.sectorReferent.findMany()
     * 
     * // Get first 10 SectorReferents
     * const sectorReferents = await prisma.sectorReferent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectorReferentWithIdOnly = await prisma.sectorReferent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectorReferentFindManyArgs>(args?: SelectSubset<T, SectorReferentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SectorReferent.
     * @param {SectorReferentCreateArgs} args - Arguments to create a SectorReferent.
     * @example
     * // Create one SectorReferent
     * const SectorReferent = await prisma.sectorReferent.create({
     *   data: {
     *     // ... data to create a SectorReferent
     *   }
     * })
     * 
     */
    create<T extends SectorReferentCreateArgs>(args: SelectSubset<T, SectorReferentCreateArgs<ExtArgs>>): Prisma__SectorReferentClient<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SectorReferents.
     * @param {SectorReferentCreateManyArgs} args - Arguments to create many SectorReferents.
     * @example
     * // Create many SectorReferents
     * const sectorReferent = await prisma.sectorReferent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectorReferentCreateManyArgs>(args?: SelectSubset<T, SectorReferentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SectorReferents and returns the data saved in the database.
     * @param {SectorReferentCreateManyAndReturnArgs} args - Arguments to create many SectorReferents.
     * @example
     * // Create many SectorReferents
     * const sectorReferent = await prisma.sectorReferent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SectorReferents and only return the `id`
     * const sectorReferentWithIdOnly = await prisma.sectorReferent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SectorReferentCreateManyAndReturnArgs>(args?: SelectSubset<T, SectorReferentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SectorReferent.
     * @param {SectorReferentDeleteArgs} args - Arguments to delete one SectorReferent.
     * @example
     * // Delete one SectorReferent
     * const SectorReferent = await prisma.sectorReferent.delete({
     *   where: {
     *     // ... filter to delete one SectorReferent
     *   }
     * })
     * 
     */
    delete<T extends SectorReferentDeleteArgs>(args: SelectSubset<T, SectorReferentDeleteArgs<ExtArgs>>): Prisma__SectorReferentClient<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SectorReferent.
     * @param {SectorReferentUpdateArgs} args - Arguments to update one SectorReferent.
     * @example
     * // Update one SectorReferent
     * const sectorReferent = await prisma.sectorReferent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectorReferentUpdateArgs>(args: SelectSubset<T, SectorReferentUpdateArgs<ExtArgs>>): Prisma__SectorReferentClient<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SectorReferents.
     * @param {SectorReferentDeleteManyArgs} args - Arguments to filter SectorReferents to delete.
     * @example
     * // Delete a few SectorReferents
     * const { count } = await prisma.sectorReferent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectorReferentDeleteManyArgs>(args?: SelectSubset<T, SectorReferentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SectorReferents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorReferentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SectorReferents
     * const sectorReferent = await prisma.sectorReferent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectorReferentUpdateManyArgs>(args: SelectSubset<T, SectorReferentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SectorReferents and returns the data updated in the database.
     * @param {SectorReferentUpdateManyAndReturnArgs} args - Arguments to update many SectorReferents.
     * @example
     * // Update many SectorReferents
     * const sectorReferent = await prisma.sectorReferent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SectorReferents and only return the `id`
     * const sectorReferentWithIdOnly = await prisma.sectorReferent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SectorReferentUpdateManyAndReturnArgs>(args: SelectSubset<T, SectorReferentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SectorReferent.
     * @param {SectorReferentUpsertArgs} args - Arguments to update or create a SectorReferent.
     * @example
     * // Update or create a SectorReferent
     * const sectorReferent = await prisma.sectorReferent.upsert({
     *   create: {
     *     // ... data to create a SectorReferent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SectorReferent we want to update
     *   }
     * })
     */
    upsert<T extends SectorReferentUpsertArgs>(args: SelectSubset<T, SectorReferentUpsertArgs<ExtArgs>>): Prisma__SectorReferentClient<$Result.GetResult<Prisma.$SectorReferentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SectorReferents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorReferentCountArgs} args - Arguments to filter SectorReferents to count.
     * @example
     * // Count the number of SectorReferents
     * const count = await prisma.sectorReferent.count({
     *   where: {
     *     // ... the filter for the SectorReferents we want to count
     *   }
     * })
    **/
    count<T extends SectorReferentCountArgs>(
      args?: Subset<T, SectorReferentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectorReferentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SectorReferent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorReferentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SectorReferentAggregateArgs>(args: Subset<T, SectorReferentAggregateArgs>): Prisma.PrismaPromise<GetSectorReferentAggregateType<T>>

    /**
     * Group by SectorReferent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorReferentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SectorReferentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectorReferentGroupByArgs['orderBy'] }
        : { orderBy?: SectorReferentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SectorReferentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectorReferentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SectorReferent model
   */
  readonly fields: SectorReferentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SectorReferent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectorReferentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sector<T extends SectorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectorDefaultArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SectorReferent model
   */
  interface SectorReferentFieldRefs {
    readonly id: FieldRef<"SectorReferent", 'String'>
    readonly userId: FieldRef<"SectorReferent", 'String'>
    readonly sectorId: FieldRef<"SectorReferent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SectorReferent findUnique
   */
  export type SectorReferentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    /**
     * Filter, which SectorReferent to fetch.
     */
    where: SectorReferentWhereUniqueInput
  }

  /**
   * SectorReferent findUniqueOrThrow
   */
  export type SectorReferentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    /**
     * Filter, which SectorReferent to fetch.
     */
    where: SectorReferentWhereUniqueInput
  }

  /**
   * SectorReferent findFirst
   */
  export type SectorReferentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    /**
     * Filter, which SectorReferent to fetch.
     */
    where?: SectorReferentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectorReferents to fetch.
     */
    orderBy?: SectorReferentOrderByWithRelationInput | SectorReferentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SectorReferents.
     */
    cursor?: SectorReferentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectorReferents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectorReferents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SectorReferents.
     */
    distinct?: SectorReferentScalarFieldEnum | SectorReferentScalarFieldEnum[]
  }

  /**
   * SectorReferent findFirstOrThrow
   */
  export type SectorReferentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    /**
     * Filter, which SectorReferent to fetch.
     */
    where?: SectorReferentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectorReferents to fetch.
     */
    orderBy?: SectorReferentOrderByWithRelationInput | SectorReferentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SectorReferents.
     */
    cursor?: SectorReferentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectorReferents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectorReferents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SectorReferents.
     */
    distinct?: SectorReferentScalarFieldEnum | SectorReferentScalarFieldEnum[]
  }

  /**
   * SectorReferent findMany
   */
  export type SectorReferentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    /**
     * Filter, which SectorReferents to fetch.
     */
    where?: SectorReferentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectorReferents to fetch.
     */
    orderBy?: SectorReferentOrderByWithRelationInput | SectorReferentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SectorReferents.
     */
    cursor?: SectorReferentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectorReferents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectorReferents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SectorReferents.
     */
    distinct?: SectorReferentScalarFieldEnum | SectorReferentScalarFieldEnum[]
  }

  /**
   * SectorReferent create
   */
  export type SectorReferentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    /**
     * The data needed to create a SectorReferent.
     */
    data: XOR<SectorReferentCreateInput, SectorReferentUncheckedCreateInput>
  }

  /**
   * SectorReferent createMany
   */
  export type SectorReferentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SectorReferents.
     */
    data: SectorReferentCreateManyInput | SectorReferentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SectorReferent createManyAndReturn
   */
  export type SectorReferentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * The data used to create many SectorReferents.
     */
    data: SectorReferentCreateManyInput | SectorReferentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SectorReferent update
   */
  export type SectorReferentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    /**
     * The data needed to update a SectorReferent.
     */
    data: XOR<SectorReferentUpdateInput, SectorReferentUncheckedUpdateInput>
    /**
     * Choose, which SectorReferent to update.
     */
    where: SectorReferentWhereUniqueInput
  }

  /**
   * SectorReferent updateMany
   */
  export type SectorReferentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SectorReferents.
     */
    data: XOR<SectorReferentUpdateManyMutationInput, SectorReferentUncheckedUpdateManyInput>
    /**
     * Filter which SectorReferents to update
     */
    where?: SectorReferentWhereInput
    /**
     * Limit how many SectorReferents to update.
     */
    limit?: number
  }

  /**
   * SectorReferent updateManyAndReturn
   */
  export type SectorReferentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * The data used to update SectorReferents.
     */
    data: XOR<SectorReferentUpdateManyMutationInput, SectorReferentUncheckedUpdateManyInput>
    /**
     * Filter which SectorReferents to update
     */
    where?: SectorReferentWhereInput
    /**
     * Limit how many SectorReferents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SectorReferent upsert
   */
  export type SectorReferentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    /**
     * The filter to search for the SectorReferent to update in case it exists.
     */
    where: SectorReferentWhereUniqueInput
    /**
     * In case the SectorReferent found by the `where` argument doesn't exist, create a new SectorReferent with this data.
     */
    create: XOR<SectorReferentCreateInput, SectorReferentUncheckedCreateInput>
    /**
     * In case the SectorReferent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectorReferentUpdateInput, SectorReferentUncheckedUpdateInput>
  }

  /**
   * SectorReferent delete
   */
  export type SectorReferentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
    /**
     * Filter which SectorReferent to delete.
     */
    where: SectorReferentWhereUniqueInput
  }

  /**
   * SectorReferent deleteMany
   */
  export type SectorReferentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SectorReferents to delete
     */
    where?: SectorReferentWhereInput
    /**
     * Limit how many SectorReferents to delete.
     */
    limit?: number
  }

  /**
   * SectorReferent without action
   */
  export type SectorReferentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorReferent
     */
    select?: SectorReferentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectorReferent
     */
    omit?: SectorReferentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorReferentInclude<ExtArgs> | null
  }


  /**
   * Model Timeslot
   */

  export type AggregateTimeslot = {
    _count: TimeslotCountAggregateOutputType | null
    _avg: TimeslotAvgAggregateOutputType | null
    _sum: TimeslotSumAggregateOutputType | null
    _min: TimeslotMinAggregateOutputType | null
    _max: TimeslotMaxAggregateOutputType | null
  }

  export type TimeslotAvgAggregateOutputType = {
    totalVolunteers: number | null
  }

  export type TimeslotSumAggregateOutputType = {
    totalVolunteers: number | null
  }

  export type TimeslotMinAggregateOutputType = {
    id: string | null
    name: string | null
    dateStart: Date | null
    dateEnd: Date | null
    totalVolunteers: number | null
    details: string | null
    sectorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeslotMaxAggregateOutputType = {
    id: string | null
    name: string | null
    dateStart: Date | null
    dateEnd: Date | null
    totalVolunteers: number | null
    details: string | null
    sectorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TimeslotCountAggregateOutputType = {
    id: number
    name: number
    dateStart: number
    dateEnd: number
    totalVolunteers: number
    details: number
    sectorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TimeslotAvgAggregateInputType = {
    totalVolunteers?: true
  }

  export type TimeslotSumAggregateInputType = {
    totalVolunteers?: true
  }

  export type TimeslotMinAggregateInputType = {
    id?: true
    name?: true
    dateStart?: true
    dateEnd?: true
    totalVolunteers?: true
    details?: true
    sectorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeslotMaxAggregateInputType = {
    id?: true
    name?: true
    dateStart?: true
    dateEnd?: true
    totalVolunteers?: true
    details?: true
    sectorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TimeslotCountAggregateInputType = {
    id?: true
    name?: true
    dateStart?: true
    dateEnd?: true
    totalVolunteers?: true
    details?: true
    sectorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TimeslotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Timeslot to aggregate.
     */
    where?: TimeslotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timeslots to fetch.
     */
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimeslotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timeslots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timeslots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Timeslots
    **/
    _count?: true | TimeslotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimeslotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimeslotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimeslotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimeslotMaxAggregateInputType
  }

  export type GetTimeslotAggregateType<T extends TimeslotAggregateArgs> = {
        [P in keyof T & keyof AggregateTimeslot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimeslot[P]>
      : GetScalarType<T[P], AggregateTimeslot[P]>
  }




  export type TimeslotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimeslotWhereInput
    orderBy?: TimeslotOrderByWithAggregationInput | TimeslotOrderByWithAggregationInput[]
    by: TimeslotScalarFieldEnum[] | TimeslotScalarFieldEnum
    having?: TimeslotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimeslotCountAggregateInputType | true
    _avg?: TimeslotAvgAggregateInputType
    _sum?: TimeslotSumAggregateInputType
    _min?: TimeslotMinAggregateInputType
    _max?: TimeslotMaxAggregateInputType
  }

  export type TimeslotGroupByOutputType = {
    id: string
    name: string
    dateStart: Date | null
    dateEnd: Date | null
    totalVolunteers: number
    details: string | null
    sectorId: string
    createdAt: Date
    updatedAt: Date
    _count: TimeslotCountAggregateOutputType | null
    _avg: TimeslotAvgAggregateOutputType | null
    _sum: TimeslotSumAggregateOutputType | null
    _min: TimeslotMinAggregateOutputType | null
    _max: TimeslotMaxAggregateOutputType | null
  }

  type GetTimeslotGroupByPayload<T extends TimeslotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimeslotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimeslotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimeslotGroupByOutputType[P]>
            : GetScalarType<T[P], TimeslotGroupByOutputType[P]>
        }
      >
    >


  export type TimeslotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dateStart?: boolean
    dateEnd?: boolean
    totalVolunteers?: boolean
    details?: boolean
    sectorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sector?: boolean | SectorDefaultArgs<ExtArgs>
    affectations?: boolean | Timeslot$affectationsArgs<ExtArgs>
    _count?: boolean | TimeslotCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeslot"]>

  export type TimeslotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dateStart?: boolean
    dateEnd?: boolean
    totalVolunteers?: boolean
    details?: boolean
    sectorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeslot"]>

  export type TimeslotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dateStart?: boolean
    dateEnd?: boolean
    totalVolunteers?: boolean
    details?: boolean
    sectorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timeslot"]>

  export type TimeslotSelectScalar = {
    id?: boolean
    name?: boolean
    dateStart?: boolean
    dateEnd?: boolean
    totalVolunteers?: boolean
    details?: boolean
    sectorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TimeslotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "dateStart" | "dateEnd" | "totalVolunteers" | "details" | "sectorId" | "createdAt" | "updatedAt", ExtArgs["result"]["timeslot"]>
  export type TimeslotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sector?: boolean | SectorDefaultArgs<ExtArgs>
    affectations?: boolean | Timeslot$affectationsArgs<ExtArgs>
    _count?: boolean | TimeslotCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TimeslotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }
  export type TimeslotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }

  export type $TimeslotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Timeslot"
    objects: {
      sector: Prisma.$SectorPayload<ExtArgs>
      affectations: Prisma.$AffectationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      dateStart: Date | null
      dateEnd: Date | null
      totalVolunteers: number
      details: string | null
      sectorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["timeslot"]>
    composites: {}
  }

  type TimeslotGetPayload<S extends boolean | null | undefined | TimeslotDefaultArgs> = $Result.GetResult<Prisma.$TimeslotPayload, S>

  type TimeslotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TimeslotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimeslotCountAggregateInputType | true
    }

  export interface TimeslotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Timeslot'], meta: { name: 'Timeslot' } }
    /**
     * Find zero or one Timeslot that matches the filter.
     * @param {TimeslotFindUniqueArgs} args - Arguments to find a Timeslot
     * @example
     * // Get one Timeslot
     * const timeslot = await prisma.timeslot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimeslotFindUniqueArgs>(args: SelectSubset<T, TimeslotFindUniqueArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Timeslot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TimeslotFindUniqueOrThrowArgs} args - Arguments to find a Timeslot
     * @example
     * // Get one Timeslot
     * const timeslot = await prisma.timeslot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimeslotFindUniqueOrThrowArgs>(args: SelectSubset<T, TimeslotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Timeslot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotFindFirstArgs} args - Arguments to find a Timeslot
     * @example
     * // Get one Timeslot
     * const timeslot = await prisma.timeslot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimeslotFindFirstArgs>(args?: SelectSubset<T, TimeslotFindFirstArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Timeslot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotFindFirstOrThrowArgs} args - Arguments to find a Timeslot
     * @example
     * // Get one Timeslot
     * const timeslot = await prisma.timeslot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimeslotFindFirstOrThrowArgs>(args?: SelectSubset<T, TimeslotFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Timeslots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Timeslots
     * const timeslots = await prisma.timeslot.findMany()
     * 
     * // Get first 10 Timeslots
     * const timeslots = await prisma.timeslot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timeslotWithIdOnly = await prisma.timeslot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimeslotFindManyArgs>(args?: SelectSubset<T, TimeslotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Timeslot.
     * @param {TimeslotCreateArgs} args - Arguments to create a Timeslot.
     * @example
     * // Create one Timeslot
     * const Timeslot = await prisma.timeslot.create({
     *   data: {
     *     // ... data to create a Timeslot
     *   }
     * })
     * 
     */
    create<T extends TimeslotCreateArgs>(args: SelectSubset<T, TimeslotCreateArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Timeslots.
     * @param {TimeslotCreateManyArgs} args - Arguments to create many Timeslots.
     * @example
     * // Create many Timeslots
     * const timeslot = await prisma.timeslot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimeslotCreateManyArgs>(args?: SelectSubset<T, TimeslotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Timeslots and returns the data saved in the database.
     * @param {TimeslotCreateManyAndReturnArgs} args - Arguments to create many Timeslots.
     * @example
     * // Create many Timeslots
     * const timeslot = await prisma.timeslot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Timeslots and only return the `id`
     * const timeslotWithIdOnly = await prisma.timeslot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimeslotCreateManyAndReturnArgs>(args?: SelectSubset<T, TimeslotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Timeslot.
     * @param {TimeslotDeleteArgs} args - Arguments to delete one Timeslot.
     * @example
     * // Delete one Timeslot
     * const Timeslot = await prisma.timeslot.delete({
     *   where: {
     *     // ... filter to delete one Timeslot
     *   }
     * })
     * 
     */
    delete<T extends TimeslotDeleteArgs>(args: SelectSubset<T, TimeslotDeleteArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Timeslot.
     * @param {TimeslotUpdateArgs} args - Arguments to update one Timeslot.
     * @example
     * // Update one Timeslot
     * const timeslot = await prisma.timeslot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimeslotUpdateArgs>(args: SelectSubset<T, TimeslotUpdateArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Timeslots.
     * @param {TimeslotDeleteManyArgs} args - Arguments to filter Timeslots to delete.
     * @example
     * // Delete a few Timeslots
     * const { count } = await prisma.timeslot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimeslotDeleteManyArgs>(args?: SelectSubset<T, TimeslotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Timeslots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Timeslots
     * const timeslot = await prisma.timeslot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimeslotUpdateManyArgs>(args: SelectSubset<T, TimeslotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Timeslots and returns the data updated in the database.
     * @param {TimeslotUpdateManyAndReturnArgs} args - Arguments to update many Timeslots.
     * @example
     * // Update many Timeslots
     * const timeslot = await prisma.timeslot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Timeslots and only return the `id`
     * const timeslotWithIdOnly = await prisma.timeslot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TimeslotUpdateManyAndReturnArgs>(args: SelectSubset<T, TimeslotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Timeslot.
     * @param {TimeslotUpsertArgs} args - Arguments to update or create a Timeslot.
     * @example
     * // Update or create a Timeslot
     * const timeslot = await prisma.timeslot.upsert({
     *   create: {
     *     // ... data to create a Timeslot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Timeslot we want to update
     *   }
     * })
     */
    upsert<T extends TimeslotUpsertArgs>(args: SelectSubset<T, TimeslotUpsertArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Timeslots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotCountArgs} args - Arguments to filter Timeslots to count.
     * @example
     * // Count the number of Timeslots
     * const count = await prisma.timeslot.count({
     *   where: {
     *     // ... the filter for the Timeslots we want to count
     *   }
     * })
    **/
    count<T extends TimeslotCountArgs>(
      args?: Subset<T, TimeslotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimeslotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Timeslot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimeslotAggregateArgs>(args: Subset<T, TimeslotAggregateArgs>): Prisma.PrismaPromise<GetTimeslotAggregateType<T>>

    /**
     * Group by Timeslot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimeslotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimeslotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimeslotGroupByArgs['orderBy'] }
        : { orderBy?: TimeslotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimeslotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeslotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Timeslot model
   */
  readonly fields: TimeslotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Timeslot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimeslotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sector<T extends SectorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectorDefaultArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    affectations<T extends Timeslot$affectationsArgs<ExtArgs> = {}>(args?: Subset<T, Timeslot$affectationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Timeslot model
   */
  interface TimeslotFieldRefs {
    readonly id: FieldRef<"Timeslot", 'String'>
    readonly name: FieldRef<"Timeslot", 'String'>
    readonly dateStart: FieldRef<"Timeslot", 'DateTime'>
    readonly dateEnd: FieldRef<"Timeslot", 'DateTime'>
    readonly totalVolunteers: FieldRef<"Timeslot", 'Int'>
    readonly details: FieldRef<"Timeslot", 'String'>
    readonly sectorId: FieldRef<"Timeslot", 'String'>
    readonly createdAt: FieldRef<"Timeslot", 'DateTime'>
    readonly updatedAt: FieldRef<"Timeslot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Timeslot findUnique
   */
  export type TimeslotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslot to fetch.
     */
    where: TimeslotWhereUniqueInput
  }

  /**
   * Timeslot findUniqueOrThrow
   */
  export type TimeslotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslot to fetch.
     */
    where: TimeslotWhereUniqueInput
  }

  /**
   * Timeslot findFirst
   */
  export type TimeslotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslot to fetch.
     */
    where?: TimeslotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timeslots to fetch.
     */
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Timeslots.
     */
    cursor?: TimeslotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timeslots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timeslots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timeslots.
     */
    distinct?: TimeslotScalarFieldEnum | TimeslotScalarFieldEnum[]
  }

  /**
   * Timeslot findFirstOrThrow
   */
  export type TimeslotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslot to fetch.
     */
    where?: TimeslotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timeslots to fetch.
     */
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Timeslots.
     */
    cursor?: TimeslotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timeslots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timeslots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timeslots.
     */
    distinct?: TimeslotScalarFieldEnum | TimeslotScalarFieldEnum[]
  }

  /**
   * Timeslot findMany
   */
  export type TimeslotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter, which Timeslots to fetch.
     */
    where?: TimeslotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timeslots to fetch.
     */
    orderBy?: TimeslotOrderByWithRelationInput | TimeslotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Timeslots.
     */
    cursor?: TimeslotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timeslots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timeslots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timeslots.
     */
    distinct?: TimeslotScalarFieldEnum | TimeslotScalarFieldEnum[]
  }

  /**
   * Timeslot create
   */
  export type TimeslotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * The data needed to create a Timeslot.
     */
    data: XOR<TimeslotCreateInput, TimeslotUncheckedCreateInput>
  }

  /**
   * Timeslot createMany
   */
  export type TimeslotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Timeslots.
     */
    data: TimeslotCreateManyInput | TimeslotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Timeslot createManyAndReturn
   */
  export type TimeslotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * The data used to create many Timeslots.
     */
    data: TimeslotCreateManyInput | TimeslotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Timeslot update
   */
  export type TimeslotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * The data needed to update a Timeslot.
     */
    data: XOR<TimeslotUpdateInput, TimeslotUncheckedUpdateInput>
    /**
     * Choose, which Timeslot to update.
     */
    where: TimeslotWhereUniqueInput
  }

  /**
   * Timeslot updateMany
   */
  export type TimeslotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Timeslots.
     */
    data: XOR<TimeslotUpdateManyMutationInput, TimeslotUncheckedUpdateManyInput>
    /**
     * Filter which Timeslots to update
     */
    where?: TimeslotWhereInput
    /**
     * Limit how many Timeslots to update.
     */
    limit?: number
  }

  /**
   * Timeslot updateManyAndReturn
   */
  export type TimeslotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * The data used to update Timeslots.
     */
    data: XOR<TimeslotUpdateManyMutationInput, TimeslotUncheckedUpdateManyInput>
    /**
     * Filter which Timeslots to update
     */
    where?: TimeslotWhereInput
    /**
     * Limit how many Timeslots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Timeslot upsert
   */
  export type TimeslotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * The filter to search for the Timeslot to update in case it exists.
     */
    where: TimeslotWhereUniqueInput
    /**
     * In case the Timeslot found by the `where` argument doesn't exist, create a new Timeslot with this data.
     */
    create: XOR<TimeslotCreateInput, TimeslotUncheckedCreateInput>
    /**
     * In case the Timeslot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimeslotUpdateInput, TimeslotUncheckedUpdateInput>
  }

  /**
   * Timeslot delete
   */
  export type TimeslotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
    /**
     * Filter which Timeslot to delete.
     */
    where: TimeslotWhereUniqueInput
  }

  /**
   * Timeslot deleteMany
   */
  export type TimeslotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Timeslots to delete
     */
    where?: TimeslotWhereInput
    /**
     * Limit how many Timeslots to delete.
     */
    limit?: number
  }

  /**
   * Timeslot.affectations
   */
  export type Timeslot$affectationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    where?: AffectationWhereInput
    orderBy?: AffectationOrderByWithRelationInput | AffectationOrderByWithRelationInput[]
    cursor?: AffectationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffectationScalarFieldEnum | AffectationScalarFieldEnum[]
  }

  /**
   * Timeslot without action
   */
  export type TimeslotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timeslot
     */
    select?: TimeslotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Timeslot
     */
    omit?: TimeslotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimeslotInclude<ExtArgs> | null
  }


  /**
   * Model Affectation
   */

  export type AggregateAffectation = {
    _count: AffectationCountAggregateOutputType | null
    _avg: AffectationAvgAggregateOutputType | null
    _sum: AffectationSumAggregateOutputType | null
    _min: AffectationMinAggregateOutputType | null
    _max: AffectationMaxAggregateOutputType | null
  }

  export type AffectationAvgAggregateOutputType = {
    number: number | null
  }

  export type AffectationSumAggregateOutputType = {
    number: number | null
  }

  export type AffectationMinAggregateOutputType = {
    id: string | null
    number: number | null
    status: $Enums.AffectationStatus | null
    volunteerId: string | null
    timeslotId: string | null
    sectorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffectationMaxAggregateOutputType = {
    id: string | null
    number: number | null
    status: $Enums.AffectationStatus | null
    volunteerId: string | null
    timeslotId: string | null
    sectorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AffectationCountAggregateOutputType = {
    id: number
    number: number
    status: number
    volunteerId: number
    timeslotId: number
    sectorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AffectationAvgAggregateInputType = {
    number?: true
  }

  export type AffectationSumAggregateInputType = {
    number?: true
  }

  export type AffectationMinAggregateInputType = {
    id?: true
    number?: true
    status?: true
    volunteerId?: true
    timeslotId?: true
    sectorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffectationMaxAggregateInputType = {
    id?: true
    number?: true
    status?: true
    volunteerId?: true
    timeslotId?: true
    sectorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AffectationCountAggregateInputType = {
    id?: true
    number?: true
    status?: true
    volunteerId?: true
    timeslotId?: true
    sectorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AffectationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Affectation to aggregate.
     */
    where?: AffectationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affectations to fetch.
     */
    orderBy?: AffectationOrderByWithRelationInput | AffectationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffectationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affectations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affectations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Affectations
    **/
    _count?: true | AffectationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AffectationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AffectationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffectationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffectationMaxAggregateInputType
  }

  export type GetAffectationAggregateType<T extends AffectationAggregateArgs> = {
        [P in keyof T & keyof AggregateAffectation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffectation[P]>
      : GetScalarType<T[P], AggregateAffectation[P]>
  }




  export type AffectationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffectationWhereInput
    orderBy?: AffectationOrderByWithAggregationInput | AffectationOrderByWithAggregationInput[]
    by: AffectationScalarFieldEnum[] | AffectationScalarFieldEnum
    having?: AffectationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffectationCountAggregateInputType | true
    _avg?: AffectationAvgAggregateInputType
    _sum?: AffectationSumAggregateInputType
    _min?: AffectationMinAggregateInputType
    _max?: AffectationMaxAggregateInputType
  }

  export type AffectationGroupByOutputType = {
    id: string
    number: number
    status: $Enums.AffectationStatus
    volunteerId: string
    timeslotId: string
    sectorId: string
    createdAt: Date
    updatedAt: Date
    _count: AffectationCountAggregateOutputType | null
    _avg: AffectationAvgAggregateOutputType | null
    _sum: AffectationSumAggregateOutputType | null
    _min: AffectationMinAggregateOutputType | null
    _max: AffectationMaxAggregateOutputType | null
  }

  type GetAffectationGroupByPayload<T extends AffectationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffectationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffectationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffectationGroupByOutputType[P]>
            : GetScalarType<T[P], AffectationGroupByOutputType[P]>
        }
      >
    >


  export type AffectationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    status?: boolean
    volunteerId?: boolean
    timeslotId?: boolean
    sectorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    volunteer?: boolean | UserDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affectation"]>

  export type AffectationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    status?: boolean
    volunteerId?: boolean
    timeslotId?: boolean
    sectorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    volunteer?: boolean | UserDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affectation"]>

  export type AffectationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    status?: boolean
    volunteerId?: boolean
    timeslotId?: boolean
    sectorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    volunteer?: boolean | UserDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affectation"]>

  export type AffectationSelectScalar = {
    id?: boolean
    number?: boolean
    status?: boolean
    volunteerId?: boolean
    timeslotId?: boolean
    sectorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AffectationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "number" | "status" | "volunteerId" | "timeslotId" | "sectorId" | "createdAt" | "updatedAt", ExtArgs["result"]["affectation"]>
  export type AffectationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteer?: boolean | UserDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }
  export type AffectationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteer?: boolean | UserDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }
  export type AffectationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteer?: boolean | UserDefaultArgs<ExtArgs>
    timeslot?: boolean | TimeslotDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }

  export type $AffectationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Affectation"
    objects: {
      volunteer: Prisma.$UserPayload<ExtArgs>
      timeslot: Prisma.$TimeslotPayload<ExtArgs>
      sector: Prisma.$SectorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: number
      status: $Enums.AffectationStatus
      volunteerId: string
      timeslotId: string
      sectorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["affectation"]>
    composites: {}
  }

  type AffectationGetPayload<S extends boolean | null | undefined | AffectationDefaultArgs> = $Result.GetResult<Prisma.$AffectationPayload, S>

  type AffectationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffectationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffectationCountAggregateInputType | true
    }

  export interface AffectationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Affectation'], meta: { name: 'Affectation' } }
    /**
     * Find zero or one Affectation that matches the filter.
     * @param {AffectationFindUniqueArgs} args - Arguments to find a Affectation
     * @example
     * // Get one Affectation
     * const affectation = await prisma.affectation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffectationFindUniqueArgs>(args: SelectSubset<T, AffectationFindUniqueArgs<ExtArgs>>): Prisma__AffectationClient<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Affectation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffectationFindUniqueOrThrowArgs} args - Arguments to find a Affectation
     * @example
     * // Get one Affectation
     * const affectation = await prisma.affectation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffectationFindUniqueOrThrowArgs>(args: SelectSubset<T, AffectationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffectationClient<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Affectation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffectationFindFirstArgs} args - Arguments to find a Affectation
     * @example
     * // Get one Affectation
     * const affectation = await prisma.affectation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffectationFindFirstArgs>(args?: SelectSubset<T, AffectationFindFirstArgs<ExtArgs>>): Prisma__AffectationClient<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Affectation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffectationFindFirstOrThrowArgs} args - Arguments to find a Affectation
     * @example
     * // Get one Affectation
     * const affectation = await prisma.affectation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffectationFindFirstOrThrowArgs>(args?: SelectSubset<T, AffectationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffectationClient<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Affectations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffectationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Affectations
     * const affectations = await prisma.affectation.findMany()
     * 
     * // Get first 10 Affectations
     * const affectations = await prisma.affectation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affectationWithIdOnly = await prisma.affectation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffectationFindManyArgs>(args?: SelectSubset<T, AffectationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Affectation.
     * @param {AffectationCreateArgs} args - Arguments to create a Affectation.
     * @example
     * // Create one Affectation
     * const Affectation = await prisma.affectation.create({
     *   data: {
     *     // ... data to create a Affectation
     *   }
     * })
     * 
     */
    create<T extends AffectationCreateArgs>(args: SelectSubset<T, AffectationCreateArgs<ExtArgs>>): Prisma__AffectationClient<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Affectations.
     * @param {AffectationCreateManyArgs} args - Arguments to create many Affectations.
     * @example
     * // Create many Affectations
     * const affectation = await prisma.affectation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffectationCreateManyArgs>(args?: SelectSubset<T, AffectationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Affectations and returns the data saved in the database.
     * @param {AffectationCreateManyAndReturnArgs} args - Arguments to create many Affectations.
     * @example
     * // Create many Affectations
     * const affectation = await prisma.affectation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Affectations and only return the `id`
     * const affectationWithIdOnly = await prisma.affectation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffectationCreateManyAndReturnArgs>(args?: SelectSubset<T, AffectationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Affectation.
     * @param {AffectationDeleteArgs} args - Arguments to delete one Affectation.
     * @example
     * // Delete one Affectation
     * const Affectation = await prisma.affectation.delete({
     *   where: {
     *     // ... filter to delete one Affectation
     *   }
     * })
     * 
     */
    delete<T extends AffectationDeleteArgs>(args: SelectSubset<T, AffectationDeleteArgs<ExtArgs>>): Prisma__AffectationClient<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Affectation.
     * @param {AffectationUpdateArgs} args - Arguments to update one Affectation.
     * @example
     * // Update one Affectation
     * const affectation = await prisma.affectation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffectationUpdateArgs>(args: SelectSubset<T, AffectationUpdateArgs<ExtArgs>>): Prisma__AffectationClient<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Affectations.
     * @param {AffectationDeleteManyArgs} args - Arguments to filter Affectations to delete.
     * @example
     * // Delete a few Affectations
     * const { count } = await prisma.affectation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffectationDeleteManyArgs>(args?: SelectSubset<T, AffectationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Affectations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffectationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Affectations
     * const affectation = await prisma.affectation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffectationUpdateManyArgs>(args: SelectSubset<T, AffectationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Affectations and returns the data updated in the database.
     * @param {AffectationUpdateManyAndReturnArgs} args - Arguments to update many Affectations.
     * @example
     * // Update many Affectations
     * const affectation = await prisma.affectation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Affectations and only return the `id`
     * const affectationWithIdOnly = await prisma.affectation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffectationUpdateManyAndReturnArgs>(args: SelectSubset<T, AffectationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Affectation.
     * @param {AffectationUpsertArgs} args - Arguments to update or create a Affectation.
     * @example
     * // Update or create a Affectation
     * const affectation = await prisma.affectation.upsert({
     *   create: {
     *     // ... data to create a Affectation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Affectation we want to update
     *   }
     * })
     */
    upsert<T extends AffectationUpsertArgs>(args: SelectSubset<T, AffectationUpsertArgs<ExtArgs>>): Prisma__AffectationClient<$Result.GetResult<Prisma.$AffectationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Affectations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffectationCountArgs} args - Arguments to filter Affectations to count.
     * @example
     * // Count the number of Affectations
     * const count = await prisma.affectation.count({
     *   where: {
     *     // ... the filter for the Affectations we want to count
     *   }
     * })
    **/
    count<T extends AffectationCountArgs>(
      args?: Subset<T, AffectationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffectationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Affectation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffectationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffectationAggregateArgs>(args: Subset<T, AffectationAggregateArgs>): Prisma.PrismaPromise<GetAffectationAggregateType<T>>

    /**
     * Group by Affectation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffectationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffectationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffectationGroupByArgs['orderBy'] }
        : { orderBy?: AffectationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffectationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffectationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Affectation model
   */
  readonly fields: AffectationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Affectation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffectationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    volunteer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    timeslot<T extends TimeslotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TimeslotDefaultArgs<ExtArgs>>): Prisma__TimeslotClient<$Result.GetResult<Prisma.$TimeslotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sector<T extends SectorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectorDefaultArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Affectation model
   */
  interface AffectationFieldRefs {
    readonly id: FieldRef<"Affectation", 'String'>
    readonly number: FieldRef<"Affectation", 'Int'>
    readonly status: FieldRef<"Affectation", 'AffectationStatus'>
    readonly volunteerId: FieldRef<"Affectation", 'String'>
    readonly timeslotId: FieldRef<"Affectation", 'String'>
    readonly sectorId: FieldRef<"Affectation", 'String'>
    readonly createdAt: FieldRef<"Affectation", 'DateTime'>
    readonly updatedAt: FieldRef<"Affectation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Affectation findUnique
   */
  export type AffectationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    /**
     * Filter, which Affectation to fetch.
     */
    where: AffectationWhereUniqueInput
  }

  /**
   * Affectation findUniqueOrThrow
   */
  export type AffectationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    /**
     * Filter, which Affectation to fetch.
     */
    where: AffectationWhereUniqueInput
  }

  /**
   * Affectation findFirst
   */
  export type AffectationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    /**
     * Filter, which Affectation to fetch.
     */
    where?: AffectationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affectations to fetch.
     */
    orderBy?: AffectationOrderByWithRelationInput | AffectationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Affectations.
     */
    cursor?: AffectationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affectations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affectations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affectations.
     */
    distinct?: AffectationScalarFieldEnum | AffectationScalarFieldEnum[]
  }

  /**
   * Affectation findFirstOrThrow
   */
  export type AffectationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    /**
     * Filter, which Affectation to fetch.
     */
    where?: AffectationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affectations to fetch.
     */
    orderBy?: AffectationOrderByWithRelationInput | AffectationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Affectations.
     */
    cursor?: AffectationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affectations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affectations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affectations.
     */
    distinct?: AffectationScalarFieldEnum | AffectationScalarFieldEnum[]
  }

  /**
   * Affectation findMany
   */
  export type AffectationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    /**
     * Filter, which Affectations to fetch.
     */
    where?: AffectationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affectations to fetch.
     */
    orderBy?: AffectationOrderByWithRelationInput | AffectationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Affectations.
     */
    cursor?: AffectationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affectations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affectations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affectations.
     */
    distinct?: AffectationScalarFieldEnum | AffectationScalarFieldEnum[]
  }

  /**
   * Affectation create
   */
  export type AffectationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    /**
     * The data needed to create a Affectation.
     */
    data: XOR<AffectationCreateInput, AffectationUncheckedCreateInput>
  }

  /**
   * Affectation createMany
   */
  export type AffectationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Affectations.
     */
    data: AffectationCreateManyInput | AffectationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Affectation createManyAndReturn
   */
  export type AffectationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * The data used to create many Affectations.
     */
    data: AffectationCreateManyInput | AffectationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Affectation update
   */
  export type AffectationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    /**
     * The data needed to update a Affectation.
     */
    data: XOR<AffectationUpdateInput, AffectationUncheckedUpdateInput>
    /**
     * Choose, which Affectation to update.
     */
    where: AffectationWhereUniqueInput
  }

  /**
   * Affectation updateMany
   */
  export type AffectationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Affectations.
     */
    data: XOR<AffectationUpdateManyMutationInput, AffectationUncheckedUpdateManyInput>
    /**
     * Filter which Affectations to update
     */
    where?: AffectationWhereInput
    /**
     * Limit how many Affectations to update.
     */
    limit?: number
  }

  /**
   * Affectation updateManyAndReturn
   */
  export type AffectationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * The data used to update Affectations.
     */
    data: XOR<AffectationUpdateManyMutationInput, AffectationUncheckedUpdateManyInput>
    /**
     * Filter which Affectations to update
     */
    where?: AffectationWhereInput
    /**
     * Limit how many Affectations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Affectation upsert
   */
  export type AffectationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    /**
     * The filter to search for the Affectation to update in case it exists.
     */
    where: AffectationWhereUniqueInput
    /**
     * In case the Affectation found by the `where` argument doesn't exist, create a new Affectation with this data.
     */
    create: XOR<AffectationCreateInput, AffectationUncheckedCreateInput>
    /**
     * In case the Affectation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffectationUpdateInput, AffectationUncheckedUpdateInput>
  }

  /**
   * Affectation delete
   */
  export type AffectationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
    /**
     * Filter which Affectation to delete.
     */
    where: AffectationWhereUniqueInput
  }

  /**
   * Affectation deleteMany
   */
  export type AffectationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Affectations to delete
     */
    where?: AffectationWhereInput
    /**
     * Limit how many Affectations to delete.
     */
    limit?: number
  }

  /**
   * Affectation without action
   */
  export type AffectationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affectation
     */
    select?: AffectationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Affectation
     */
    omit?: AffectationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffectationInclude<ExtArgs> | null
  }


  /**
   * Model Mission
   */

  export type AggregateMission = {
    _count: MissionCountAggregateOutputType | null
    _avg: MissionAvgAggregateOutputType | null
    _sum: MissionSumAggregateOutputType | null
    _min: MissionMinAggregateOutputType | null
    _max: MissionMaxAggregateOutputType | null
  }

  export type MissionAvgAggregateOutputType = {
    humanResources: number | null
  }

  export type MissionSumAggregateOutputType = {
    humanResources: number | null
  }

  export type MissionMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    dateStart: Date | null
    dateEnd: Date | null
    place: string | null
    priority: $Enums.MissionPriority | null
    status: $Enums.MissionStatus | null
    humanResources: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MissionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    dateStart: Date | null
    dateEnd: Date | null
    place: string | null
    priority: $Enums.MissionPriority | null
    status: $Enums.MissionStatus | null
    humanResources: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MissionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    dateStart: number
    dateEnd: number
    place: number
    priority: number
    status: number
    humanResources: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MissionAvgAggregateInputType = {
    humanResources?: true
  }

  export type MissionSumAggregateInputType = {
    humanResources?: true
  }

  export type MissionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    dateStart?: true
    dateEnd?: true
    place?: true
    priority?: true
    status?: true
    humanResources?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MissionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    dateStart?: true
    dateEnd?: true
    place?: true
    priority?: true
    status?: true
    humanResources?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MissionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    dateStart?: true
    dateEnd?: true
    place?: true
    priority?: true
    status?: true
    humanResources?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mission to aggregate.
     */
    where?: MissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Missions to fetch.
     */
    orderBy?: MissionOrderByWithRelationInput | MissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Missions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Missions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Missions
    **/
    _count?: true | MissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MissionMaxAggregateInputType
  }

  export type GetMissionAggregateType<T extends MissionAggregateArgs> = {
        [P in keyof T & keyof AggregateMission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMission[P]>
      : GetScalarType<T[P], AggregateMission[P]>
  }




  export type MissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MissionWhereInput
    orderBy?: MissionOrderByWithAggregationInput | MissionOrderByWithAggregationInput[]
    by: MissionScalarFieldEnum[] | MissionScalarFieldEnum
    having?: MissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MissionCountAggregateInputType | true
    _avg?: MissionAvgAggregateInputType
    _sum?: MissionSumAggregateInputType
    _min?: MissionMinAggregateInputType
    _max?: MissionMaxAggregateInputType
  }

  export type MissionGroupByOutputType = {
    id: string
    name: string
    description: string | null
    dateStart: Date
    dateEnd: Date
    place: string | null
    priority: $Enums.MissionPriority
    status: $Enums.MissionStatus
    humanResources: number
    createdAt: Date
    updatedAt: Date
    _count: MissionCountAggregateOutputType | null
    _avg: MissionAvgAggregateOutputType | null
    _sum: MissionSumAggregateOutputType | null
    _min: MissionMinAggregateOutputType | null
    _max: MissionMaxAggregateOutputType | null
  }

  type GetMissionGroupByPayload<T extends MissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MissionGroupByOutputType[P]>
            : GetScalarType<T[P], MissionGroupByOutputType[P]>
        }
      >
    >


  export type MissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    dateStart?: boolean
    dateEnd?: boolean
    place?: boolean
    priority?: boolean
    status?: boolean
    humanResources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignments?: boolean | Mission$assignmentsArgs<ExtArgs>
    _count?: boolean | MissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mission"]>

  export type MissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    dateStart?: boolean
    dateEnd?: boolean
    place?: boolean
    priority?: boolean
    status?: boolean
    humanResources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mission"]>

  export type MissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    dateStart?: boolean
    dateEnd?: boolean
    place?: boolean
    priority?: boolean
    status?: boolean
    humanResources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mission"]>

  export type MissionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    dateStart?: boolean
    dateEnd?: boolean
    place?: boolean
    priority?: boolean
    status?: boolean
    humanResources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "dateStart" | "dateEnd" | "place" | "priority" | "status" | "humanResources" | "createdAt" | "updatedAt", ExtArgs["result"]["mission"]>
  export type MissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | Mission$assignmentsArgs<ExtArgs>
    _count?: boolean | MissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mission"
    objects: {
      assignments: Prisma.$MissionAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      dateStart: Date
      dateEnd: Date
      place: string | null
      priority: $Enums.MissionPriority
      status: $Enums.MissionStatus
      humanResources: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mission"]>
    composites: {}
  }

  type MissionGetPayload<S extends boolean | null | undefined | MissionDefaultArgs> = $Result.GetResult<Prisma.$MissionPayload, S>

  type MissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MissionCountAggregateInputType | true
    }

  export interface MissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mission'], meta: { name: 'Mission' } }
    /**
     * Find zero or one Mission that matches the filter.
     * @param {MissionFindUniqueArgs} args - Arguments to find a Mission
     * @example
     * // Get one Mission
     * const mission = await prisma.mission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MissionFindUniqueArgs>(args: SelectSubset<T, MissionFindUniqueArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MissionFindUniqueOrThrowArgs} args - Arguments to find a Mission
     * @example
     * // Get one Mission
     * const mission = await prisma.mission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MissionFindUniqueOrThrowArgs>(args: SelectSubset<T, MissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionFindFirstArgs} args - Arguments to find a Mission
     * @example
     * // Get one Mission
     * const mission = await prisma.mission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MissionFindFirstArgs>(args?: SelectSubset<T, MissionFindFirstArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionFindFirstOrThrowArgs} args - Arguments to find a Mission
     * @example
     * // Get one Mission
     * const mission = await prisma.mission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MissionFindFirstOrThrowArgs>(args?: SelectSubset<T, MissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Missions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Missions
     * const missions = await prisma.mission.findMany()
     * 
     * // Get first 10 Missions
     * const missions = await prisma.mission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const missionWithIdOnly = await prisma.mission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MissionFindManyArgs>(args?: SelectSubset<T, MissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mission.
     * @param {MissionCreateArgs} args - Arguments to create a Mission.
     * @example
     * // Create one Mission
     * const Mission = await prisma.mission.create({
     *   data: {
     *     // ... data to create a Mission
     *   }
     * })
     * 
     */
    create<T extends MissionCreateArgs>(args: SelectSubset<T, MissionCreateArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Missions.
     * @param {MissionCreateManyArgs} args - Arguments to create many Missions.
     * @example
     * // Create many Missions
     * const mission = await prisma.mission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MissionCreateManyArgs>(args?: SelectSubset<T, MissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Missions and returns the data saved in the database.
     * @param {MissionCreateManyAndReturnArgs} args - Arguments to create many Missions.
     * @example
     * // Create many Missions
     * const mission = await prisma.mission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Missions and only return the `id`
     * const missionWithIdOnly = await prisma.mission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MissionCreateManyAndReturnArgs>(args?: SelectSubset<T, MissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mission.
     * @param {MissionDeleteArgs} args - Arguments to delete one Mission.
     * @example
     * // Delete one Mission
     * const Mission = await prisma.mission.delete({
     *   where: {
     *     // ... filter to delete one Mission
     *   }
     * })
     * 
     */
    delete<T extends MissionDeleteArgs>(args: SelectSubset<T, MissionDeleteArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mission.
     * @param {MissionUpdateArgs} args - Arguments to update one Mission.
     * @example
     * // Update one Mission
     * const mission = await prisma.mission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MissionUpdateArgs>(args: SelectSubset<T, MissionUpdateArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Missions.
     * @param {MissionDeleteManyArgs} args - Arguments to filter Missions to delete.
     * @example
     * // Delete a few Missions
     * const { count } = await prisma.mission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MissionDeleteManyArgs>(args?: SelectSubset<T, MissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Missions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Missions
     * const mission = await prisma.mission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MissionUpdateManyArgs>(args: SelectSubset<T, MissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Missions and returns the data updated in the database.
     * @param {MissionUpdateManyAndReturnArgs} args - Arguments to update many Missions.
     * @example
     * // Update many Missions
     * const mission = await prisma.mission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Missions and only return the `id`
     * const missionWithIdOnly = await prisma.mission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MissionUpdateManyAndReturnArgs>(args: SelectSubset<T, MissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mission.
     * @param {MissionUpsertArgs} args - Arguments to update or create a Mission.
     * @example
     * // Update or create a Mission
     * const mission = await prisma.mission.upsert({
     *   create: {
     *     // ... data to create a Mission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mission we want to update
     *   }
     * })
     */
    upsert<T extends MissionUpsertArgs>(args: SelectSubset<T, MissionUpsertArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Missions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionCountArgs} args - Arguments to filter Missions to count.
     * @example
     * // Count the number of Missions
     * const count = await prisma.mission.count({
     *   where: {
     *     // ... the filter for the Missions we want to count
     *   }
     * })
    **/
    count<T extends MissionCountArgs>(
      args?: Subset<T, MissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MissionAggregateArgs>(args: Subset<T, MissionAggregateArgs>): Prisma.PrismaPromise<GetMissionAggregateType<T>>

    /**
     * Group by Mission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MissionGroupByArgs['orderBy'] }
        : { orderBy?: MissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mission model
   */
  readonly fields: MissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends Mission$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Mission$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mission model
   */
  interface MissionFieldRefs {
    readonly id: FieldRef<"Mission", 'String'>
    readonly name: FieldRef<"Mission", 'String'>
    readonly description: FieldRef<"Mission", 'String'>
    readonly dateStart: FieldRef<"Mission", 'DateTime'>
    readonly dateEnd: FieldRef<"Mission", 'DateTime'>
    readonly place: FieldRef<"Mission", 'String'>
    readonly priority: FieldRef<"Mission", 'MissionPriority'>
    readonly status: FieldRef<"Mission", 'MissionStatus'>
    readonly humanResources: FieldRef<"Mission", 'Int'>
    readonly createdAt: FieldRef<"Mission", 'DateTime'>
    readonly updatedAt: FieldRef<"Mission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mission findUnique
   */
  export type MissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Mission to fetch.
     */
    where: MissionWhereUniqueInput
  }

  /**
   * Mission findUniqueOrThrow
   */
  export type MissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Mission to fetch.
     */
    where: MissionWhereUniqueInput
  }

  /**
   * Mission findFirst
   */
  export type MissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Mission to fetch.
     */
    where?: MissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Missions to fetch.
     */
    orderBy?: MissionOrderByWithRelationInput | MissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Missions.
     */
    cursor?: MissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Missions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Missions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Missions.
     */
    distinct?: MissionScalarFieldEnum | MissionScalarFieldEnum[]
  }

  /**
   * Mission findFirstOrThrow
   */
  export type MissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Mission to fetch.
     */
    where?: MissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Missions to fetch.
     */
    orderBy?: MissionOrderByWithRelationInput | MissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Missions.
     */
    cursor?: MissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Missions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Missions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Missions.
     */
    distinct?: MissionScalarFieldEnum | MissionScalarFieldEnum[]
  }

  /**
   * Mission findMany
   */
  export type MissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Missions to fetch.
     */
    where?: MissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Missions to fetch.
     */
    orderBy?: MissionOrderByWithRelationInput | MissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Missions.
     */
    cursor?: MissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Missions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Missions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Missions.
     */
    distinct?: MissionScalarFieldEnum | MissionScalarFieldEnum[]
  }

  /**
   * Mission create
   */
  export type MissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Mission.
     */
    data: XOR<MissionCreateInput, MissionUncheckedCreateInput>
  }

  /**
   * Mission createMany
   */
  export type MissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Missions.
     */
    data: MissionCreateManyInput | MissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mission createManyAndReturn
   */
  export type MissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * The data used to create many Missions.
     */
    data: MissionCreateManyInput | MissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mission update
   */
  export type MissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Mission.
     */
    data: XOR<MissionUpdateInput, MissionUncheckedUpdateInput>
    /**
     * Choose, which Mission to update.
     */
    where: MissionWhereUniqueInput
  }

  /**
   * Mission updateMany
   */
  export type MissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Missions.
     */
    data: XOR<MissionUpdateManyMutationInput, MissionUncheckedUpdateManyInput>
    /**
     * Filter which Missions to update
     */
    where?: MissionWhereInput
    /**
     * Limit how many Missions to update.
     */
    limit?: number
  }

  /**
   * Mission updateManyAndReturn
   */
  export type MissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * The data used to update Missions.
     */
    data: XOR<MissionUpdateManyMutationInput, MissionUncheckedUpdateManyInput>
    /**
     * Filter which Missions to update
     */
    where?: MissionWhereInput
    /**
     * Limit how many Missions to update.
     */
    limit?: number
  }

  /**
   * Mission upsert
   */
  export type MissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Mission to update in case it exists.
     */
    where: MissionWhereUniqueInput
    /**
     * In case the Mission found by the `where` argument doesn't exist, create a new Mission with this data.
     */
    create: XOR<MissionCreateInput, MissionUncheckedCreateInput>
    /**
     * In case the Mission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MissionUpdateInput, MissionUncheckedUpdateInput>
  }

  /**
   * Mission delete
   */
  export type MissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter which Mission to delete.
     */
    where: MissionWhereUniqueInput
  }

  /**
   * Mission deleteMany
   */
  export type MissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Missions to delete
     */
    where?: MissionWhereInput
    /**
     * Limit how many Missions to delete.
     */
    limit?: number
  }

  /**
   * Mission.assignments
   */
  export type Mission$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    where?: MissionAssignmentWhereInput
    orderBy?: MissionAssignmentOrderByWithRelationInput | MissionAssignmentOrderByWithRelationInput[]
    cursor?: MissionAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MissionAssignmentScalarFieldEnum | MissionAssignmentScalarFieldEnum[]
  }

  /**
   * Mission without action
   */
  export type MissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
  }


  /**
   * Model MissionAssignment
   */

  export type AggregateMissionAssignment = {
    _count: MissionAssignmentCountAggregateOutputType | null
    _min: MissionAssignmentMinAggregateOutputType | null
    _max: MissionAssignmentMaxAggregateOutputType | null
  }

  export type MissionAssignmentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    missionId: string | null
  }

  export type MissionAssignmentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    missionId: string | null
  }

  export type MissionAssignmentCountAggregateOutputType = {
    id: number
    userId: number
    missionId: number
    _all: number
  }


  export type MissionAssignmentMinAggregateInputType = {
    id?: true
    userId?: true
    missionId?: true
  }

  export type MissionAssignmentMaxAggregateInputType = {
    id?: true
    userId?: true
    missionId?: true
  }

  export type MissionAssignmentCountAggregateInputType = {
    id?: true
    userId?: true
    missionId?: true
    _all?: true
  }

  export type MissionAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MissionAssignment to aggregate.
     */
    where?: MissionAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissionAssignments to fetch.
     */
    orderBy?: MissionAssignmentOrderByWithRelationInput | MissionAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MissionAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissionAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissionAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MissionAssignments
    **/
    _count?: true | MissionAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MissionAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MissionAssignmentMaxAggregateInputType
  }

  export type GetMissionAssignmentAggregateType<T extends MissionAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateMissionAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMissionAssignment[P]>
      : GetScalarType<T[P], AggregateMissionAssignment[P]>
  }




  export type MissionAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MissionAssignmentWhereInput
    orderBy?: MissionAssignmentOrderByWithAggregationInput | MissionAssignmentOrderByWithAggregationInput[]
    by: MissionAssignmentScalarFieldEnum[] | MissionAssignmentScalarFieldEnum
    having?: MissionAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MissionAssignmentCountAggregateInputType | true
    _min?: MissionAssignmentMinAggregateInputType
    _max?: MissionAssignmentMaxAggregateInputType
  }

  export type MissionAssignmentGroupByOutputType = {
    id: string
    userId: string
    missionId: string
    _count: MissionAssignmentCountAggregateOutputType | null
    _min: MissionAssignmentMinAggregateOutputType | null
    _max: MissionAssignmentMaxAggregateOutputType | null
  }

  type GetMissionAssignmentGroupByPayload<T extends MissionAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MissionAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MissionAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MissionAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], MissionAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type MissionAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    missionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["missionAssignment"]>

  export type MissionAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    missionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["missionAssignment"]>

  export type MissionAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    missionId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["missionAssignment"]>

  export type MissionAssignmentSelectScalar = {
    id?: boolean
    userId?: boolean
    missionId?: boolean
  }

  export type MissionAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "missionId", ExtArgs["result"]["missionAssignment"]>
  export type MissionAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }
  export type MissionAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }
  export type MissionAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }

  export type $MissionAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MissionAssignment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      mission: Prisma.$MissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      missionId: string
    }, ExtArgs["result"]["missionAssignment"]>
    composites: {}
  }

  type MissionAssignmentGetPayload<S extends boolean | null | undefined | MissionAssignmentDefaultArgs> = $Result.GetResult<Prisma.$MissionAssignmentPayload, S>

  type MissionAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MissionAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MissionAssignmentCountAggregateInputType | true
    }

  export interface MissionAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MissionAssignment'], meta: { name: 'MissionAssignment' } }
    /**
     * Find zero or one MissionAssignment that matches the filter.
     * @param {MissionAssignmentFindUniqueArgs} args - Arguments to find a MissionAssignment
     * @example
     * // Get one MissionAssignment
     * const missionAssignment = await prisma.missionAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MissionAssignmentFindUniqueArgs>(args: SelectSubset<T, MissionAssignmentFindUniqueArgs<ExtArgs>>): Prisma__MissionAssignmentClient<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MissionAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MissionAssignmentFindUniqueOrThrowArgs} args - Arguments to find a MissionAssignment
     * @example
     * // Get one MissionAssignment
     * const missionAssignment = await prisma.missionAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MissionAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, MissionAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MissionAssignmentClient<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MissionAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionAssignmentFindFirstArgs} args - Arguments to find a MissionAssignment
     * @example
     * // Get one MissionAssignment
     * const missionAssignment = await prisma.missionAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MissionAssignmentFindFirstArgs>(args?: SelectSubset<T, MissionAssignmentFindFirstArgs<ExtArgs>>): Prisma__MissionAssignmentClient<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MissionAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionAssignmentFindFirstOrThrowArgs} args - Arguments to find a MissionAssignment
     * @example
     * // Get one MissionAssignment
     * const missionAssignment = await prisma.missionAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MissionAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, MissionAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__MissionAssignmentClient<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MissionAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MissionAssignments
     * const missionAssignments = await prisma.missionAssignment.findMany()
     * 
     * // Get first 10 MissionAssignments
     * const missionAssignments = await prisma.missionAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const missionAssignmentWithIdOnly = await prisma.missionAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MissionAssignmentFindManyArgs>(args?: SelectSubset<T, MissionAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MissionAssignment.
     * @param {MissionAssignmentCreateArgs} args - Arguments to create a MissionAssignment.
     * @example
     * // Create one MissionAssignment
     * const MissionAssignment = await prisma.missionAssignment.create({
     *   data: {
     *     // ... data to create a MissionAssignment
     *   }
     * })
     * 
     */
    create<T extends MissionAssignmentCreateArgs>(args: SelectSubset<T, MissionAssignmentCreateArgs<ExtArgs>>): Prisma__MissionAssignmentClient<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MissionAssignments.
     * @param {MissionAssignmentCreateManyArgs} args - Arguments to create many MissionAssignments.
     * @example
     * // Create many MissionAssignments
     * const missionAssignment = await prisma.missionAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MissionAssignmentCreateManyArgs>(args?: SelectSubset<T, MissionAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MissionAssignments and returns the data saved in the database.
     * @param {MissionAssignmentCreateManyAndReturnArgs} args - Arguments to create many MissionAssignments.
     * @example
     * // Create many MissionAssignments
     * const missionAssignment = await prisma.missionAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MissionAssignments and only return the `id`
     * const missionAssignmentWithIdOnly = await prisma.missionAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MissionAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, MissionAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MissionAssignment.
     * @param {MissionAssignmentDeleteArgs} args - Arguments to delete one MissionAssignment.
     * @example
     * // Delete one MissionAssignment
     * const MissionAssignment = await prisma.missionAssignment.delete({
     *   where: {
     *     // ... filter to delete one MissionAssignment
     *   }
     * })
     * 
     */
    delete<T extends MissionAssignmentDeleteArgs>(args: SelectSubset<T, MissionAssignmentDeleteArgs<ExtArgs>>): Prisma__MissionAssignmentClient<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MissionAssignment.
     * @param {MissionAssignmentUpdateArgs} args - Arguments to update one MissionAssignment.
     * @example
     * // Update one MissionAssignment
     * const missionAssignment = await prisma.missionAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MissionAssignmentUpdateArgs>(args: SelectSubset<T, MissionAssignmentUpdateArgs<ExtArgs>>): Prisma__MissionAssignmentClient<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MissionAssignments.
     * @param {MissionAssignmentDeleteManyArgs} args - Arguments to filter MissionAssignments to delete.
     * @example
     * // Delete a few MissionAssignments
     * const { count } = await prisma.missionAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MissionAssignmentDeleteManyArgs>(args?: SelectSubset<T, MissionAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MissionAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MissionAssignments
     * const missionAssignment = await prisma.missionAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MissionAssignmentUpdateManyArgs>(args: SelectSubset<T, MissionAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MissionAssignments and returns the data updated in the database.
     * @param {MissionAssignmentUpdateManyAndReturnArgs} args - Arguments to update many MissionAssignments.
     * @example
     * // Update many MissionAssignments
     * const missionAssignment = await prisma.missionAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MissionAssignments and only return the `id`
     * const missionAssignmentWithIdOnly = await prisma.missionAssignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MissionAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, MissionAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MissionAssignment.
     * @param {MissionAssignmentUpsertArgs} args - Arguments to update or create a MissionAssignment.
     * @example
     * // Update or create a MissionAssignment
     * const missionAssignment = await prisma.missionAssignment.upsert({
     *   create: {
     *     // ... data to create a MissionAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MissionAssignment we want to update
     *   }
     * })
     */
    upsert<T extends MissionAssignmentUpsertArgs>(args: SelectSubset<T, MissionAssignmentUpsertArgs<ExtArgs>>): Prisma__MissionAssignmentClient<$Result.GetResult<Prisma.$MissionAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MissionAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionAssignmentCountArgs} args - Arguments to filter MissionAssignments to count.
     * @example
     * // Count the number of MissionAssignments
     * const count = await prisma.missionAssignment.count({
     *   where: {
     *     // ... the filter for the MissionAssignments we want to count
     *   }
     * })
    **/
    count<T extends MissionAssignmentCountArgs>(
      args?: Subset<T, MissionAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MissionAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MissionAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MissionAssignmentAggregateArgs>(args: Subset<T, MissionAssignmentAggregateArgs>): Prisma.PrismaPromise<GetMissionAssignmentAggregateType<T>>

    /**
     * Group by MissionAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MissionAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MissionAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: MissionAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MissionAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMissionAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MissionAssignment model
   */
  readonly fields: MissionAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MissionAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MissionAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mission<T extends MissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MissionDefaultArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MissionAssignment model
   */
  interface MissionAssignmentFieldRefs {
    readonly id: FieldRef<"MissionAssignment", 'String'>
    readonly userId: FieldRef<"MissionAssignment", 'String'>
    readonly missionId: FieldRef<"MissionAssignment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MissionAssignment findUnique
   */
  export type MissionAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which MissionAssignment to fetch.
     */
    where: MissionAssignmentWhereUniqueInput
  }

  /**
   * MissionAssignment findUniqueOrThrow
   */
  export type MissionAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which MissionAssignment to fetch.
     */
    where: MissionAssignmentWhereUniqueInput
  }

  /**
   * MissionAssignment findFirst
   */
  export type MissionAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which MissionAssignment to fetch.
     */
    where?: MissionAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissionAssignments to fetch.
     */
    orderBy?: MissionAssignmentOrderByWithRelationInput | MissionAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MissionAssignments.
     */
    cursor?: MissionAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissionAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissionAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MissionAssignments.
     */
    distinct?: MissionAssignmentScalarFieldEnum | MissionAssignmentScalarFieldEnum[]
  }

  /**
   * MissionAssignment findFirstOrThrow
   */
  export type MissionAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which MissionAssignment to fetch.
     */
    where?: MissionAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissionAssignments to fetch.
     */
    orderBy?: MissionAssignmentOrderByWithRelationInput | MissionAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MissionAssignments.
     */
    cursor?: MissionAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissionAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissionAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MissionAssignments.
     */
    distinct?: MissionAssignmentScalarFieldEnum | MissionAssignmentScalarFieldEnum[]
  }

  /**
   * MissionAssignment findMany
   */
  export type MissionAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which MissionAssignments to fetch.
     */
    where?: MissionAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissionAssignments to fetch.
     */
    orderBy?: MissionAssignmentOrderByWithRelationInput | MissionAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MissionAssignments.
     */
    cursor?: MissionAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissionAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissionAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MissionAssignments.
     */
    distinct?: MissionAssignmentScalarFieldEnum | MissionAssignmentScalarFieldEnum[]
  }

  /**
   * MissionAssignment create
   */
  export type MissionAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a MissionAssignment.
     */
    data: XOR<MissionAssignmentCreateInput, MissionAssignmentUncheckedCreateInput>
  }

  /**
   * MissionAssignment createMany
   */
  export type MissionAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MissionAssignments.
     */
    data: MissionAssignmentCreateManyInput | MissionAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MissionAssignment createManyAndReturn
   */
  export type MissionAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many MissionAssignments.
     */
    data: MissionAssignmentCreateManyInput | MissionAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MissionAssignment update
   */
  export type MissionAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a MissionAssignment.
     */
    data: XOR<MissionAssignmentUpdateInput, MissionAssignmentUncheckedUpdateInput>
    /**
     * Choose, which MissionAssignment to update.
     */
    where: MissionAssignmentWhereUniqueInput
  }

  /**
   * MissionAssignment updateMany
   */
  export type MissionAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MissionAssignments.
     */
    data: XOR<MissionAssignmentUpdateManyMutationInput, MissionAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which MissionAssignments to update
     */
    where?: MissionAssignmentWhereInput
    /**
     * Limit how many MissionAssignments to update.
     */
    limit?: number
  }

  /**
   * MissionAssignment updateManyAndReturn
   */
  export type MissionAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update MissionAssignments.
     */
    data: XOR<MissionAssignmentUpdateManyMutationInput, MissionAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which MissionAssignments to update
     */
    where?: MissionAssignmentWhereInput
    /**
     * Limit how many MissionAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MissionAssignment upsert
   */
  export type MissionAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the MissionAssignment to update in case it exists.
     */
    where: MissionAssignmentWhereUniqueInput
    /**
     * In case the MissionAssignment found by the `where` argument doesn't exist, create a new MissionAssignment with this data.
     */
    create: XOR<MissionAssignmentCreateInput, MissionAssignmentUncheckedCreateInput>
    /**
     * In case the MissionAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MissionAssignmentUpdateInput, MissionAssignmentUncheckedUpdateInput>
  }

  /**
   * MissionAssignment delete
   */
  export type MissionAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
    /**
     * Filter which MissionAssignment to delete.
     */
    where: MissionAssignmentWhereUniqueInput
  }

  /**
   * MissionAssignment deleteMany
   */
  export type MissionAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MissionAssignments to delete
     */
    where?: MissionAssignmentWhereInput
    /**
     * Limit how many MissionAssignments to delete.
     */
    limit?: number
  }

  /**
   * MissionAssignment without action
   */
  export type MissionAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionAssignment
     */
    select?: MissionAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionAssignment
     */
    omit?: MissionAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type EventSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    category: $Enums.EventCategory | null
    place: string | null
    day: string | null
    startTime: Date | null
    endTime: Date | null
    imageSrc: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    category: $Enums.EventCategory | null
    place: string | null
    day: string | null
    startTime: Date | null
    endTime: Date | null
    imageSrc: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    description: number
    category: number
    place: number
    day: number
    startTime: number
    endTime: number
    imageSrc: number
    sortOrder: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    sortOrder?: true
  }

  export type EventSumAggregateInputType = {
    sortOrder?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    category?: true
    place?: true
    day?: true
    startTime?: true
    endTime?: true
    imageSrc?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    category?: true
    place?: true
    day?: true
    startTime?: true
    endTime?: true
    imageSrc?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    place?: true
    day?: true
    startTime?: true
    endTime?: true
    imageSrc?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    title: JsonValue
    description: JsonValue | null
    category: $Enums.EventCategory
    place: string | null
    day: string
    startTime: Date
    endTime: Date | null
    imageSrc: string | null
    sortOrder: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    place?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    imageSrc?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    place?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    imageSrc?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    place?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    imageSrc?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    place?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    imageSrc?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "category" | "place" | "day" | "startTime" | "endTime" | "imageSrc" | "sortOrder" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["event"]>

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: Prisma.JsonValue
      description: Prisma.JsonValue | null
      category: $Enums.EventCategory
      place: string | null
      day: string
      startTime: Date
      endTime: Date | null
      imageSrc: string | null
      sortOrder: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly title: FieldRef<"Event", 'Json'>
    readonly description: FieldRef<"Event", 'Json'>
    readonly category: FieldRef<"Event", 'EventCategory'>
    readonly place: FieldRef<"Event", 'String'>
    readonly day: FieldRef<"Event", 'String'>
    readonly startTime: FieldRef<"Event", 'DateTime'>
    readonly endTime: FieldRef<"Event", 'DateTime'>
    readonly imageSrc: FieldRef<"Event", 'String'>
    readonly sortOrder: FieldRef<"Event", 'Int'>
    readonly isActive: FieldRef<"Event", 'Boolean'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
  }


  /**
   * Model Price
   */

  export type AggregatePrice = {
    _count: PriceCountAggregateOutputType | null
    _avg: PriceAvgAggregateOutputType | null
    _sum: PriceSumAggregateOutputType | null
    _min: PriceMinAggregateOutputType | null
    _max: PriceMaxAggregateOutputType | null
  }

  export type PriceAvgAggregateOutputType = {
    amount: number | null
    sortOrder: number | null
  }

  export type PriceSumAggregateOutputType = {
    amount: number | null
    sortOrder: number | null
  }

  export type PriceMinAggregateOutputType = {
    id: string | null
    amount: number | null
    currency: string | null
    category: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    currency: string | null
    category: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceCountAggregateOutputType = {
    id: number
    title: number
    description: number
    amount: number
    currency: number
    category: number
    sortOrder: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PriceAvgAggregateInputType = {
    amount?: true
    sortOrder?: true
  }

  export type PriceSumAggregateInputType = {
    amount?: true
    sortOrder?: true
  }

  export type PriceMinAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    category?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceMaxAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    category?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    amount?: true
    currency?: true
    category?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PriceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Price to aggregate.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prices
    **/
    _count?: true | PriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceMaxAggregateInputType
  }

  export type GetPriceAggregateType<T extends PriceAggregateArgs> = {
        [P in keyof T & keyof AggregatePrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrice[P]>
      : GetScalarType<T[P], AggregatePrice[P]>
  }




  export type PriceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceWhereInput
    orderBy?: PriceOrderByWithAggregationInput | PriceOrderByWithAggregationInput[]
    by: PriceScalarFieldEnum[] | PriceScalarFieldEnum
    having?: PriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceCountAggregateInputType | true
    _avg?: PriceAvgAggregateInputType
    _sum?: PriceSumAggregateInputType
    _min?: PriceMinAggregateInputType
    _max?: PriceMaxAggregateInputType
  }

  export type PriceGroupByOutputType = {
    id: string
    title: JsonValue
    description: JsonValue | null
    amount: number
    currency: string
    category: string | null
    sortOrder: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PriceCountAggregateOutputType | null
    _avg: PriceAvgAggregateOutputType | null
    _sum: PriceSumAggregateOutputType | null
    _min: PriceMinAggregateOutputType | null
    _max: PriceMaxAggregateOutputType | null
  }

  type GetPriceGroupByPayload<T extends PriceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceGroupByOutputType[P]>
            : GetScalarType<T[P], PriceGroupByOutputType[P]>
        }
      >
    >


  export type PriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    currency?: boolean
    category?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["price"]>

  export type PriceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    currency?: boolean
    category?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["price"]>

  export type PriceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    currency?: boolean
    category?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["price"]>

  export type PriceSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    amount?: boolean
    currency?: boolean
    category?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PriceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "amount" | "currency" | "category" | "sortOrder" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["price"]>

  export type $PricePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Price"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: Prisma.JsonValue
      description: Prisma.JsonValue | null
      amount: number
      currency: string
      category: string | null
      sortOrder: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["price"]>
    composites: {}
  }

  type PriceGetPayload<S extends boolean | null | undefined | PriceDefaultArgs> = $Result.GetResult<Prisma.$PricePayload, S>

  type PriceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceCountAggregateInputType | true
    }

  export interface PriceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Price'], meta: { name: 'Price' } }
    /**
     * Find zero or one Price that matches the filter.
     * @param {PriceFindUniqueArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceFindUniqueArgs>(args: SelectSubset<T, PriceFindUniqueArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Price that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceFindUniqueOrThrowArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Price that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceFindFirstArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceFindFirstArgs>(args?: SelectSubset<T, PriceFindFirstArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Price that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceFindFirstOrThrowArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prices
     * const prices = await prisma.price.findMany()
     * 
     * // Get first 10 Prices
     * const prices = await prisma.price.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceWithIdOnly = await prisma.price.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceFindManyArgs>(args?: SelectSubset<T, PriceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Price.
     * @param {PriceCreateArgs} args - Arguments to create a Price.
     * @example
     * // Create one Price
     * const Price = await prisma.price.create({
     *   data: {
     *     // ... data to create a Price
     *   }
     * })
     * 
     */
    create<T extends PriceCreateArgs>(args: SelectSubset<T, PriceCreateArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prices.
     * @param {PriceCreateManyArgs} args - Arguments to create many Prices.
     * @example
     * // Create many Prices
     * const price = await prisma.price.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceCreateManyArgs>(args?: SelectSubset<T, PriceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prices and returns the data saved in the database.
     * @param {PriceCreateManyAndReturnArgs} args - Arguments to create many Prices.
     * @example
     * // Create many Prices
     * const price = await prisma.price.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prices and only return the `id`
     * const priceWithIdOnly = await prisma.price.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Price.
     * @param {PriceDeleteArgs} args - Arguments to delete one Price.
     * @example
     * // Delete one Price
     * const Price = await prisma.price.delete({
     *   where: {
     *     // ... filter to delete one Price
     *   }
     * })
     * 
     */
    delete<T extends PriceDeleteArgs>(args: SelectSubset<T, PriceDeleteArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Price.
     * @param {PriceUpdateArgs} args - Arguments to update one Price.
     * @example
     * // Update one Price
     * const price = await prisma.price.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceUpdateArgs>(args: SelectSubset<T, PriceUpdateArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prices.
     * @param {PriceDeleteManyArgs} args - Arguments to filter Prices to delete.
     * @example
     * // Delete a few Prices
     * const { count } = await prisma.price.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceDeleteManyArgs>(args?: SelectSubset<T, PriceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prices
     * const price = await prisma.price.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceUpdateManyArgs>(args: SelectSubset<T, PriceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prices and returns the data updated in the database.
     * @param {PriceUpdateManyAndReturnArgs} args - Arguments to update many Prices.
     * @example
     * // Update many Prices
     * const price = await prisma.price.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prices and only return the `id`
     * const priceWithIdOnly = await prisma.price.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PriceUpdateManyAndReturnArgs>(args: SelectSubset<T, PriceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Price.
     * @param {PriceUpsertArgs} args - Arguments to update or create a Price.
     * @example
     * // Update or create a Price
     * const price = await prisma.price.upsert({
     *   create: {
     *     // ... data to create a Price
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Price we want to update
     *   }
     * })
     */
    upsert<T extends PriceUpsertArgs>(args: SelectSubset<T, PriceUpsertArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceCountArgs} args - Arguments to filter Prices to count.
     * @example
     * // Count the number of Prices
     * const count = await prisma.price.count({
     *   where: {
     *     // ... the filter for the Prices we want to count
     *   }
     * })
    **/
    count<T extends PriceCountArgs>(
      args?: Subset<T, PriceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Price.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceAggregateArgs>(args: Subset<T, PriceAggregateArgs>): Prisma.PrismaPromise<GetPriceAggregateType<T>>

    /**
     * Group by Price.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceGroupByArgs['orderBy'] }
        : { orderBy?: PriceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Price model
   */
  readonly fields: PriceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Price.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Price model
   */
  interface PriceFieldRefs {
    readonly id: FieldRef<"Price", 'String'>
    readonly title: FieldRef<"Price", 'Json'>
    readonly description: FieldRef<"Price", 'Json'>
    readonly amount: FieldRef<"Price", 'Float'>
    readonly currency: FieldRef<"Price", 'String'>
    readonly category: FieldRef<"Price", 'String'>
    readonly sortOrder: FieldRef<"Price", 'Int'>
    readonly isActive: FieldRef<"Price", 'Boolean'>
    readonly createdAt: FieldRef<"Price", 'DateTime'>
    readonly updatedAt: FieldRef<"Price", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Price findUnique
   */
  export type PriceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price findUniqueOrThrow
   */
  export type PriceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price findFirst
   */
  export type PriceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prices.
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prices.
     */
    distinct?: PriceScalarFieldEnum | PriceScalarFieldEnum[]
  }

  /**
   * Price findFirstOrThrow
   */
  export type PriceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prices.
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prices.
     */
    distinct?: PriceScalarFieldEnum | PriceScalarFieldEnum[]
  }

  /**
   * Price findMany
   */
  export type PriceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Prices to fetch.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prices.
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prices.
     */
    distinct?: PriceScalarFieldEnum | PriceScalarFieldEnum[]
  }

  /**
   * Price create
   */
  export type PriceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data needed to create a Price.
     */
    data: XOR<PriceCreateInput, PriceUncheckedCreateInput>
  }

  /**
   * Price createMany
   */
  export type PriceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prices.
     */
    data: PriceCreateManyInput | PriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Price createManyAndReturn
   */
  export type PriceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data used to create many Prices.
     */
    data: PriceCreateManyInput | PriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Price update
   */
  export type PriceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data needed to update a Price.
     */
    data: XOR<PriceUpdateInput, PriceUncheckedUpdateInput>
    /**
     * Choose, which Price to update.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price updateMany
   */
  export type PriceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prices.
     */
    data: XOR<PriceUpdateManyMutationInput, PriceUncheckedUpdateManyInput>
    /**
     * Filter which Prices to update
     */
    where?: PriceWhereInput
    /**
     * Limit how many Prices to update.
     */
    limit?: number
  }

  /**
   * Price updateManyAndReturn
   */
  export type PriceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data used to update Prices.
     */
    data: XOR<PriceUpdateManyMutationInput, PriceUncheckedUpdateManyInput>
    /**
     * Filter which Prices to update
     */
    where?: PriceWhereInput
    /**
     * Limit how many Prices to update.
     */
    limit?: number
  }

  /**
   * Price upsert
   */
  export type PriceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The filter to search for the Price to update in case it exists.
     */
    where: PriceWhereUniqueInput
    /**
     * In case the Price found by the `where` argument doesn't exist, create a new Price with this data.
     */
    create: XOR<PriceCreateInput, PriceUncheckedCreateInput>
    /**
     * In case the Price was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceUpdateInput, PriceUncheckedUpdateInput>
  }

  /**
   * Price delete
   */
  export type PriceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter which Price to delete.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price deleteMany
   */
  export type PriceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prices to delete
     */
    where?: PriceWhereInput
    /**
     * Limit how many Prices to delete.
     */
    limit?: number
  }

  /**
   * Price without action
   */
  export type PriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
  }


  /**
   * Model UsefulInfo
   */

  export type AggregateUsefulInfo = {
    _count: UsefulInfoCountAggregateOutputType | null
    _avg: UsefulInfoAvgAggregateOutputType | null
    _sum: UsefulInfoSumAggregateOutputType | null
    _min: UsefulInfoMinAggregateOutputType | null
    _max: UsefulInfoMaxAggregateOutputType | null
  }

  export type UsefulInfoAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type UsefulInfoSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type UsefulInfoMinAggregateOutputType = {
    id: string | null
    icon: string | null
    category: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsefulInfoMaxAggregateOutputType = {
    id: string | null
    icon: string | null
    category: string | null
    sortOrder: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsefulInfoCountAggregateOutputType = {
    id: number
    title: number
    content: number
    icon: number
    category: number
    sortOrder: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsefulInfoAvgAggregateInputType = {
    sortOrder?: true
  }

  export type UsefulInfoSumAggregateInputType = {
    sortOrder?: true
  }

  export type UsefulInfoMinAggregateInputType = {
    id?: true
    icon?: true
    category?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsefulInfoMaxAggregateInputType = {
    id?: true
    icon?: true
    category?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsefulInfoCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    icon?: true
    category?: true
    sortOrder?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsefulInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsefulInfo to aggregate.
     */
    where?: UsefulInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsefulInfos to fetch.
     */
    orderBy?: UsefulInfoOrderByWithRelationInput | UsefulInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsefulInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsefulInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsefulInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsefulInfos
    **/
    _count?: true | UsefulInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsefulInfoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsefulInfoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsefulInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsefulInfoMaxAggregateInputType
  }

  export type GetUsefulInfoAggregateType<T extends UsefulInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateUsefulInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsefulInfo[P]>
      : GetScalarType<T[P], AggregateUsefulInfo[P]>
  }




  export type UsefulInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsefulInfoWhereInput
    orderBy?: UsefulInfoOrderByWithAggregationInput | UsefulInfoOrderByWithAggregationInput[]
    by: UsefulInfoScalarFieldEnum[] | UsefulInfoScalarFieldEnum
    having?: UsefulInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsefulInfoCountAggregateInputType | true
    _avg?: UsefulInfoAvgAggregateInputType
    _sum?: UsefulInfoSumAggregateInputType
    _min?: UsefulInfoMinAggregateInputType
    _max?: UsefulInfoMaxAggregateInputType
  }

  export type UsefulInfoGroupByOutputType = {
    id: string
    title: JsonValue
    content: JsonValue
    icon: string | null
    category: string | null
    sortOrder: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UsefulInfoCountAggregateOutputType | null
    _avg: UsefulInfoAvgAggregateOutputType | null
    _sum: UsefulInfoSumAggregateOutputType | null
    _min: UsefulInfoMinAggregateOutputType | null
    _max: UsefulInfoMaxAggregateOutputType | null
  }

  type GetUsefulInfoGroupByPayload<T extends UsefulInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsefulInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsefulInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsefulInfoGroupByOutputType[P]>
            : GetScalarType<T[P], UsefulInfoGroupByOutputType[P]>
        }
      >
    >


  export type UsefulInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    icon?: boolean
    category?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usefulInfo"]>

  export type UsefulInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    icon?: boolean
    category?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usefulInfo"]>

  export type UsefulInfoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    icon?: boolean
    category?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usefulInfo"]>

  export type UsefulInfoSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    icon?: boolean
    category?: boolean
    sortOrder?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsefulInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "icon" | "category" | "sortOrder" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["usefulInfo"]>

  export type $UsefulInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsefulInfo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: Prisma.JsonValue
      content: Prisma.JsonValue
      icon: string | null
      category: string | null
      sortOrder: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["usefulInfo"]>
    composites: {}
  }

  type UsefulInfoGetPayload<S extends boolean | null | undefined | UsefulInfoDefaultArgs> = $Result.GetResult<Prisma.$UsefulInfoPayload, S>

  type UsefulInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsefulInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsefulInfoCountAggregateInputType | true
    }

  export interface UsefulInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsefulInfo'], meta: { name: 'UsefulInfo' } }
    /**
     * Find zero or one UsefulInfo that matches the filter.
     * @param {UsefulInfoFindUniqueArgs} args - Arguments to find a UsefulInfo
     * @example
     * // Get one UsefulInfo
     * const usefulInfo = await prisma.usefulInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsefulInfoFindUniqueArgs>(args: SelectSubset<T, UsefulInfoFindUniqueArgs<ExtArgs>>): Prisma__UsefulInfoClient<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsefulInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsefulInfoFindUniqueOrThrowArgs} args - Arguments to find a UsefulInfo
     * @example
     * // Get one UsefulInfo
     * const usefulInfo = await prisma.usefulInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsefulInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, UsefulInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsefulInfoClient<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsefulInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsefulInfoFindFirstArgs} args - Arguments to find a UsefulInfo
     * @example
     * // Get one UsefulInfo
     * const usefulInfo = await prisma.usefulInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsefulInfoFindFirstArgs>(args?: SelectSubset<T, UsefulInfoFindFirstArgs<ExtArgs>>): Prisma__UsefulInfoClient<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsefulInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsefulInfoFindFirstOrThrowArgs} args - Arguments to find a UsefulInfo
     * @example
     * // Get one UsefulInfo
     * const usefulInfo = await prisma.usefulInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsefulInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, UsefulInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsefulInfoClient<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsefulInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsefulInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsefulInfos
     * const usefulInfos = await prisma.usefulInfo.findMany()
     * 
     * // Get first 10 UsefulInfos
     * const usefulInfos = await prisma.usefulInfo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usefulInfoWithIdOnly = await prisma.usefulInfo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsefulInfoFindManyArgs>(args?: SelectSubset<T, UsefulInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsefulInfo.
     * @param {UsefulInfoCreateArgs} args - Arguments to create a UsefulInfo.
     * @example
     * // Create one UsefulInfo
     * const UsefulInfo = await prisma.usefulInfo.create({
     *   data: {
     *     // ... data to create a UsefulInfo
     *   }
     * })
     * 
     */
    create<T extends UsefulInfoCreateArgs>(args: SelectSubset<T, UsefulInfoCreateArgs<ExtArgs>>): Prisma__UsefulInfoClient<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsefulInfos.
     * @param {UsefulInfoCreateManyArgs} args - Arguments to create many UsefulInfos.
     * @example
     * // Create many UsefulInfos
     * const usefulInfo = await prisma.usefulInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsefulInfoCreateManyArgs>(args?: SelectSubset<T, UsefulInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsefulInfos and returns the data saved in the database.
     * @param {UsefulInfoCreateManyAndReturnArgs} args - Arguments to create many UsefulInfos.
     * @example
     * // Create many UsefulInfos
     * const usefulInfo = await prisma.usefulInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsefulInfos and only return the `id`
     * const usefulInfoWithIdOnly = await prisma.usefulInfo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsefulInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, UsefulInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsefulInfo.
     * @param {UsefulInfoDeleteArgs} args - Arguments to delete one UsefulInfo.
     * @example
     * // Delete one UsefulInfo
     * const UsefulInfo = await prisma.usefulInfo.delete({
     *   where: {
     *     // ... filter to delete one UsefulInfo
     *   }
     * })
     * 
     */
    delete<T extends UsefulInfoDeleteArgs>(args: SelectSubset<T, UsefulInfoDeleteArgs<ExtArgs>>): Prisma__UsefulInfoClient<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsefulInfo.
     * @param {UsefulInfoUpdateArgs} args - Arguments to update one UsefulInfo.
     * @example
     * // Update one UsefulInfo
     * const usefulInfo = await prisma.usefulInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsefulInfoUpdateArgs>(args: SelectSubset<T, UsefulInfoUpdateArgs<ExtArgs>>): Prisma__UsefulInfoClient<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsefulInfos.
     * @param {UsefulInfoDeleteManyArgs} args - Arguments to filter UsefulInfos to delete.
     * @example
     * // Delete a few UsefulInfos
     * const { count } = await prisma.usefulInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsefulInfoDeleteManyArgs>(args?: SelectSubset<T, UsefulInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsefulInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsefulInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsefulInfos
     * const usefulInfo = await prisma.usefulInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsefulInfoUpdateManyArgs>(args: SelectSubset<T, UsefulInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsefulInfos and returns the data updated in the database.
     * @param {UsefulInfoUpdateManyAndReturnArgs} args - Arguments to update many UsefulInfos.
     * @example
     * // Update many UsefulInfos
     * const usefulInfo = await prisma.usefulInfo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsefulInfos and only return the `id`
     * const usefulInfoWithIdOnly = await prisma.usefulInfo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsefulInfoUpdateManyAndReturnArgs>(args: SelectSubset<T, UsefulInfoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsefulInfo.
     * @param {UsefulInfoUpsertArgs} args - Arguments to update or create a UsefulInfo.
     * @example
     * // Update or create a UsefulInfo
     * const usefulInfo = await prisma.usefulInfo.upsert({
     *   create: {
     *     // ... data to create a UsefulInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsefulInfo we want to update
     *   }
     * })
     */
    upsert<T extends UsefulInfoUpsertArgs>(args: SelectSubset<T, UsefulInfoUpsertArgs<ExtArgs>>): Prisma__UsefulInfoClient<$Result.GetResult<Prisma.$UsefulInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsefulInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsefulInfoCountArgs} args - Arguments to filter UsefulInfos to count.
     * @example
     * // Count the number of UsefulInfos
     * const count = await prisma.usefulInfo.count({
     *   where: {
     *     // ... the filter for the UsefulInfos we want to count
     *   }
     * })
    **/
    count<T extends UsefulInfoCountArgs>(
      args?: Subset<T, UsefulInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsefulInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsefulInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsefulInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsefulInfoAggregateArgs>(args: Subset<T, UsefulInfoAggregateArgs>): Prisma.PrismaPromise<GetUsefulInfoAggregateType<T>>

    /**
     * Group by UsefulInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsefulInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsefulInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsefulInfoGroupByArgs['orderBy'] }
        : { orderBy?: UsefulInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsefulInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsefulInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsefulInfo model
   */
  readonly fields: UsefulInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsefulInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsefulInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsefulInfo model
   */
  interface UsefulInfoFieldRefs {
    readonly id: FieldRef<"UsefulInfo", 'String'>
    readonly title: FieldRef<"UsefulInfo", 'Json'>
    readonly content: FieldRef<"UsefulInfo", 'Json'>
    readonly icon: FieldRef<"UsefulInfo", 'String'>
    readonly category: FieldRef<"UsefulInfo", 'String'>
    readonly sortOrder: FieldRef<"UsefulInfo", 'Int'>
    readonly isActive: FieldRef<"UsefulInfo", 'Boolean'>
    readonly createdAt: FieldRef<"UsefulInfo", 'DateTime'>
    readonly updatedAt: FieldRef<"UsefulInfo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsefulInfo findUnique
   */
  export type UsefulInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * Filter, which UsefulInfo to fetch.
     */
    where: UsefulInfoWhereUniqueInput
  }

  /**
   * UsefulInfo findUniqueOrThrow
   */
  export type UsefulInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * Filter, which UsefulInfo to fetch.
     */
    where: UsefulInfoWhereUniqueInput
  }

  /**
   * UsefulInfo findFirst
   */
  export type UsefulInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * Filter, which UsefulInfo to fetch.
     */
    where?: UsefulInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsefulInfos to fetch.
     */
    orderBy?: UsefulInfoOrderByWithRelationInput | UsefulInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsefulInfos.
     */
    cursor?: UsefulInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsefulInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsefulInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsefulInfos.
     */
    distinct?: UsefulInfoScalarFieldEnum | UsefulInfoScalarFieldEnum[]
  }

  /**
   * UsefulInfo findFirstOrThrow
   */
  export type UsefulInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * Filter, which UsefulInfo to fetch.
     */
    where?: UsefulInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsefulInfos to fetch.
     */
    orderBy?: UsefulInfoOrderByWithRelationInput | UsefulInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsefulInfos.
     */
    cursor?: UsefulInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsefulInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsefulInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsefulInfos.
     */
    distinct?: UsefulInfoScalarFieldEnum | UsefulInfoScalarFieldEnum[]
  }

  /**
   * UsefulInfo findMany
   */
  export type UsefulInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * Filter, which UsefulInfos to fetch.
     */
    where?: UsefulInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsefulInfos to fetch.
     */
    orderBy?: UsefulInfoOrderByWithRelationInput | UsefulInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsefulInfos.
     */
    cursor?: UsefulInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsefulInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsefulInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsefulInfos.
     */
    distinct?: UsefulInfoScalarFieldEnum | UsefulInfoScalarFieldEnum[]
  }

  /**
   * UsefulInfo create
   */
  export type UsefulInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * The data needed to create a UsefulInfo.
     */
    data: XOR<UsefulInfoCreateInput, UsefulInfoUncheckedCreateInput>
  }

  /**
   * UsefulInfo createMany
   */
  export type UsefulInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsefulInfos.
     */
    data: UsefulInfoCreateManyInput | UsefulInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsefulInfo createManyAndReturn
   */
  export type UsefulInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * The data used to create many UsefulInfos.
     */
    data: UsefulInfoCreateManyInput | UsefulInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsefulInfo update
   */
  export type UsefulInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * The data needed to update a UsefulInfo.
     */
    data: XOR<UsefulInfoUpdateInput, UsefulInfoUncheckedUpdateInput>
    /**
     * Choose, which UsefulInfo to update.
     */
    where: UsefulInfoWhereUniqueInput
  }

  /**
   * UsefulInfo updateMany
   */
  export type UsefulInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsefulInfos.
     */
    data: XOR<UsefulInfoUpdateManyMutationInput, UsefulInfoUncheckedUpdateManyInput>
    /**
     * Filter which UsefulInfos to update
     */
    where?: UsefulInfoWhereInput
    /**
     * Limit how many UsefulInfos to update.
     */
    limit?: number
  }

  /**
   * UsefulInfo updateManyAndReturn
   */
  export type UsefulInfoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * The data used to update UsefulInfos.
     */
    data: XOR<UsefulInfoUpdateManyMutationInput, UsefulInfoUncheckedUpdateManyInput>
    /**
     * Filter which UsefulInfos to update
     */
    where?: UsefulInfoWhereInput
    /**
     * Limit how many UsefulInfos to update.
     */
    limit?: number
  }

  /**
   * UsefulInfo upsert
   */
  export type UsefulInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * The filter to search for the UsefulInfo to update in case it exists.
     */
    where: UsefulInfoWhereUniqueInput
    /**
     * In case the UsefulInfo found by the `where` argument doesn't exist, create a new UsefulInfo with this data.
     */
    create: XOR<UsefulInfoCreateInput, UsefulInfoUncheckedCreateInput>
    /**
     * In case the UsefulInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsefulInfoUpdateInput, UsefulInfoUncheckedUpdateInput>
  }

  /**
   * UsefulInfo delete
   */
  export type UsefulInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
    /**
     * Filter which UsefulInfo to delete.
     */
    where: UsefulInfoWhereUniqueInput
  }

  /**
   * UsefulInfo deleteMany
   */
  export type UsefulInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsefulInfos to delete
     */
    where?: UsefulInfoWhereInput
    /**
     * Limit how many UsefulInfos to delete.
     */
    limit?: number
  }

  /**
   * UsefulInfo without action
   */
  export type UsefulInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsefulInfo
     */
    select?: UsefulInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsefulInfo
     */
    omit?: UsefulInfoOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    firstname: 'firstname',
    surname: 'surname',
    phone: 'phone',
    role: 'role',
    isReferent: 'isReferent',
    isActive: 'isActive',
    status: 'status',
    avatar: 'avatar',
    notes: 'notes',
    skills: 'skills',
    availability: 'availability',
    failedLoginAttempts: 'failedLoginAttempts',
    lockedUntil: 'lockedUntil',
    lastLoginAt: 'lastLoginAt',
    lastLoginIp: 'lastLoginIp',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SectorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    color: 'color',
    status: 'status',
    skills: 'skills',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SectorScalarFieldEnum = (typeof SectorScalarFieldEnum)[keyof typeof SectorScalarFieldEnum]


  export const SectorReferentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sectorId: 'sectorId'
  };

  export type SectorReferentScalarFieldEnum = (typeof SectorReferentScalarFieldEnum)[keyof typeof SectorReferentScalarFieldEnum]


  export const TimeslotScalarFieldEnum: {
    id: 'id',
    name: 'name',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
    totalVolunteers: 'totalVolunteers',
    details: 'details',
    sectorId: 'sectorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TimeslotScalarFieldEnum = (typeof TimeslotScalarFieldEnum)[keyof typeof TimeslotScalarFieldEnum]


  export const AffectationScalarFieldEnum: {
    id: 'id',
    number: 'number',
    status: 'status',
    volunteerId: 'volunteerId',
    timeslotId: 'timeslotId',
    sectorId: 'sectorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AffectationScalarFieldEnum = (typeof AffectationScalarFieldEnum)[keyof typeof AffectationScalarFieldEnum]


  export const MissionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
    place: 'place',
    priority: 'priority',
    status: 'status',
    humanResources: 'humanResources',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MissionScalarFieldEnum = (typeof MissionScalarFieldEnum)[keyof typeof MissionScalarFieldEnum]


  export const MissionAssignmentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    missionId: 'missionId'
  };

  export type MissionAssignmentScalarFieldEnum = (typeof MissionAssignmentScalarFieldEnum)[keyof typeof MissionAssignmentScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    place: 'place',
    day: 'day',
    startTime: 'startTime',
    endTime: 'endTime',
    imageSrc: 'imageSrc',
    sortOrder: 'sortOrder',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const PriceScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    amount: 'amount',
    currency: 'currency',
    category: 'category',
    sortOrder: 'sortOrder',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PriceScalarFieldEnum = (typeof PriceScalarFieldEnum)[keyof typeof PriceScalarFieldEnum]


  export const UsefulInfoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    icon: 'icon',
    category: 'category',
    sortOrder: 'sortOrder',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsefulInfoScalarFieldEnum = (typeof UsefulInfoScalarFieldEnum)[keyof typeof UsefulInfoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AffectationStatus'
   */
  export type EnumAffectationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AffectationStatus'>
    


  /**
   * Reference to a field of type 'AffectationStatus[]'
   */
  export type ListEnumAffectationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AffectationStatus[]'>
    


  /**
   * Reference to a field of type 'MissionPriority'
   */
  export type EnumMissionPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MissionPriority'>
    


  /**
   * Reference to a field of type 'MissionPriority[]'
   */
  export type ListEnumMissionPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MissionPriority[]'>
    


  /**
   * Reference to a field of type 'MissionStatus'
   */
  export type EnumMissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MissionStatus'>
    


  /**
   * Reference to a field of type 'MissionStatus[]'
   */
  export type ListEnumMissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MissionStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'EventCategory'
   */
  export type EnumEventCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventCategory'>
    


  /**
   * Reference to a field of type 'EventCategory[]'
   */
  export type ListEnumEventCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventCategory[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    firstname?: StringNullableFilter<"User"> | string | null
    surname?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isReferent?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    status?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    notes?: StringNullableFilter<"User"> | string | null
    skills?: StringNullableListFilter<"User">
    availability?: StringNullableListFilter<"User">
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginIp?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    affectations?: AffectationListRelationFilter
    missionAssignments?: MissionAssignmentListRelationFilter
    referentSectors?: SectorReferentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    surname?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    isReferent?: SortOrder
    isActive?: SortOrder
    status?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    skills?: SortOrder
    availability?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastLoginIp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    affectations?: AffectationOrderByRelationAggregateInput
    missionAssignments?: MissionAssignmentOrderByRelationAggregateInput
    referentSectors?: SectorReferentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    firstname?: StringNullableFilter<"User"> | string | null
    surname?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isReferent?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    status?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    notes?: StringNullableFilter<"User"> | string | null
    skills?: StringNullableListFilter<"User">
    availability?: StringNullableListFilter<"User">
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginIp?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    affectations?: AffectationListRelationFilter
    missionAssignments?: MissionAssignmentListRelationFilter
    referentSectors?: SectorReferentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    surname?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    isReferent?: SortOrder
    isActive?: SortOrder
    status?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    skills?: SortOrder
    availability?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastLoginIp?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstname?: StringNullableWithAggregatesFilter<"User"> | string | null
    surname?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isReferent?: BoolWithAggregatesFilter<"User"> | boolean
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    status?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    notes?: StringNullableWithAggregatesFilter<"User"> | string | null
    skills?: StringNullableListFilter<"User">
    availability?: StringNullableListFilter<"User">
    failedLoginAttempts?: IntWithAggregatesFilter<"User"> | number
    lockedUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastLoginIp?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SectorWhereInput = {
    AND?: SectorWhereInput | SectorWhereInput[]
    OR?: SectorWhereInput[]
    NOT?: SectorWhereInput | SectorWhereInput[]
    id?: StringFilter<"Sector"> | string
    name?: StringFilter<"Sector"> | string
    description?: StringNullableFilter<"Sector"> | string | null
    color?: StringNullableFilter<"Sector"> | string | null
    status?: StringNullableFilter<"Sector"> | string | null
    skills?: StringNullableListFilter<"Sector">
    createdAt?: DateTimeFilter<"Sector"> | Date | string
    updatedAt?: DateTimeFilter<"Sector"> | Date | string
    timeslots?: TimeslotListRelationFilter
    affectations?: AffectationListRelationFilter
    referents?: SectorReferentListRelationFilter
  }

  export type SectorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    timeslots?: TimeslotOrderByRelationAggregateInput
    affectations?: AffectationOrderByRelationAggregateInput
    referents?: SectorReferentOrderByRelationAggregateInput
  }

  export type SectorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SectorWhereInput | SectorWhereInput[]
    OR?: SectorWhereInput[]
    NOT?: SectorWhereInput | SectorWhereInput[]
    name?: StringFilter<"Sector"> | string
    description?: StringNullableFilter<"Sector"> | string | null
    color?: StringNullableFilter<"Sector"> | string | null
    status?: StringNullableFilter<"Sector"> | string | null
    skills?: StringNullableListFilter<"Sector">
    createdAt?: DateTimeFilter<"Sector"> | Date | string
    updatedAt?: DateTimeFilter<"Sector"> | Date | string
    timeslots?: TimeslotListRelationFilter
    affectations?: AffectationListRelationFilter
    referents?: SectorReferentListRelationFilter
  }, "id">

  export type SectorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SectorCountOrderByAggregateInput
    _max?: SectorMaxOrderByAggregateInput
    _min?: SectorMinOrderByAggregateInput
  }

  export type SectorScalarWhereWithAggregatesInput = {
    AND?: SectorScalarWhereWithAggregatesInput | SectorScalarWhereWithAggregatesInput[]
    OR?: SectorScalarWhereWithAggregatesInput[]
    NOT?: SectorScalarWhereWithAggregatesInput | SectorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sector"> | string
    name?: StringWithAggregatesFilter<"Sector"> | string
    description?: StringNullableWithAggregatesFilter<"Sector"> | string | null
    color?: StringNullableWithAggregatesFilter<"Sector"> | string | null
    status?: StringNullableWithAggregatesFilter<"Sector"> | string | null
    skills?: StringNullableListFilter<"Sector">
    createdAt?: DateTimeWithAggregatesFilter<"Sector"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sector"> | Date | string
  }

  export type SectorReferentWhereInput = {
    AND?: SectorReferentWhereInput | SectorReferentWhereInput[]
    OR?: SectorReferentWhereInput[]
    NOT?: SectorReferentWhereInput | SectorReferentWhereInput[]
    id?: StringFilter<"SectorReferent"> | string
    userId?: StringFilter<"SectorReferent"> | string
    sectorId?: StringFilter<"SectorReferent"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sector?: XOR<SectorScalarRelationFilter, SectorWhereInput>
  }

  export type SectorReferentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sectorId?: SortOrder
    user?: UserOrderByWithRelationInput
    sector?: SectorOrderByWithRelationInput
  }

  export type SectorReferentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_sectorId?: SectorReferentUserIdSectorIdCompoundUniqueInput
    AND?: SectorReferentWhereInput | SectorReferentWhereInput[]
    OR?: SectorReferentWhereInput[]
    NOT?: SectorReferentWhereInput | SectorReferentWhereInput[]
    userId?: StringFilter<"SectorReferent"> | string
    sectorId?: StringFilter<"SectorReferent"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sector?: XOR<SectorScalarRelationFilter, SectorWhereInput>
  }, "id" | "userId_sectorId">

  export type SectorReferentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sectorId?: SortOrder
    _count?: SectorReferentCountOrderByAggregateInput
    _max?: SectorReferentMaxOrderByAggregateInput
    _min?: SectorReferentMinOrderByAggregateInput
  }

  export type SectorReferentScalarWhereWithAggregatesInput = {
    AND?: SectorReferentScalarWhereWithAggregatesInput | SectorReferentScalarWhereWithAggregatesInput[]
    OR?: SectorReferentScalarWhereWithAggregatesInput[]
    NOT?: SectorReferentScalarWhereWithAggregatesInput | SectorReferentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SectorReferent"> | string
    userId?: StringWithAggregatesFilter<"SectorReferent"> | string
    sectorId?: StringWithAggregatesFilter<"SectorReferent"> | string
  }

  export type TimeslotWhereInput = {
    AND?: TimeslotWhereInput | TimeslotWhereInput[]
    OR?: TimeslotWhereInput[]
    NOT?: TimeslotWhereInput | TimeslotWhereInput[]
    id?: StringFilter<"Timeslot"> | string
    name?: StringFilter<"Timeslot"> | string
    dateStart?: DateTimeNullableFilter<"Timeslot"> | Date | string | null
    dateEnd?: DateTimeNullableFilter<"Timeslot"> | Date | string | null
    totalVolunteers?: IntFilter<"Timeslot"> | number
    details?: StringNullableFilter<"Timeslot"> | string | null
    sectorId?: StringFilter<"Timeslot"> | string
    createdAt?: DateTimeFilter<"Timeslot"> | Date | string
    updatedAt?: DateTimeFilter<"Timeslot"> | Date | string
    sector?: XOR<SectorScalarRelationFilter, SectorWhereInput>
    affectations?: AffectationListRelationFilter
  }

  export type TimeslotOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    dateStart?: SortOrderInput | SortOrder
    dateEnd?: SortOrderInput | SortOrder
    totalVolunteers?: SortOrder
    details?: SortOrderInput | SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sector?: SectorOrderByWithRelationInput
    affectations?: AffectationOrderByRelationAggregateInput
  }

  export type TimeslotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TimeslotWhereInput | TimeslotWhereInput[]
    OR?: TimeslotWhereInput[]
    NOT?: TimeslotWhereInput | TimeslotWhereInput[]
    name?: StringFilter<"Timeslot"> | string
    dateStart?: DateTimeNullableFilter<"Timeslot"> | Date | string | null
    dateEnd?: DateTimeNullableFilter<"Timeslot"> | Date | string | null
    totalVolunteers?: IntFilter<"Timeslot"> | number
    details?: StringNullableFilter<"Timeslot"> | string | null
    sectorId?: StringFilter<"Timeslot"> | string
    createdAt?: DateTimeFilter<"Timeslot"> | Date | string
    updatedAt?: DateTimeFilter<"Timeslot"> | Date | string
    sector?: XOR<SectorScalarRelationFilter, SectorWhereInput>
    affectations?: AffectationListRelationFilter
  }, "id">

  export type TimeslotOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    dateStart?: SortOrderInput | SortOrder
    dateEnd?: SortOrderInput | SortOrder
    totalVolunteers?: SortOrder
    details?: SortOrderInput | SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TimeslotCountOrderByAggregateInput
    _avg?: TimeslotAvgOrderByAggregateInput
    _max?: TimeslotMaxOrderByAggregateInput
    _min?: TimeslotMinOrderByAggregateInput
    _sum?: TimeslotSumOrderByAggregateInput
  }

  export type TimeslotScalarWhereWithAggregatesInput = {
    AND?: TimeslotScalarWhereWithAggregatesInput | TimeslotScalarWhereWithAggregatesInput[]
    OR?: TimeslotScalarWhereWithAggregatesInput[]
    NOT?: TimeslotScalarWhereWithAggregatesInput | TimeslotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Timeslot"> | string
    name?: StringWithAggregatesFilter<"Timeslot"> | string
    dateStart?: DateTimeNullableWithAggregatesFilter<"Timeslot"> | Date | string | null
    dateEnd?: DateTimeNullableWithAggregatesFilter<"Timeslot"> | Date | string | null
    totalVolunteers?: IntWithAggregatesFilter<"Timeslot"> | number
    details?: StringNullableWithAggregatesFilter<"Timeslot"> | string | null
    sectorId?: StringWithAggregatesFilter<"Timeslot"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Timeslot"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Timeslot"> | Date | string
  }

  export type AffectationWhereInput = {
    AND?: AffectationWhereInput | AffectationWhereInput[]
    OR?: AffectationWhereInput[]
    NOT?: AffectationWhereInput | AffectationWhereInput[]
    id?: StringFilter<"Affectation"> | string
    number?: IntFilter<"Affectation"> | number
    status?: EnumAffectationStatusFilter<"Affectation"> | $Enums.AffectationStatus
    volunteerId?: StringFilter<"Affectation"> | string
    timeslotId?: StringFilter<"Affectation"> | string
    sectorId?: StringFilter<"Affectation"> | string
    createdAt?: DateTimeFilter<"Affectation"> | Date | string
    updatedAt?: DateTimeFilter<"Affectation"> | Date | string
    volunteer?: XOR<UserScalarRelationFilter, UserWhereInput>
    timeslot?: XOR<TimeslotScalarRelationFilter, TimeslotWhereInput>
    sector?: XOR<SectorScalarRelationFilter, SectorWhereInput>
  }

  export type AffectationOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    volunteerId?: SortOrder
    timeslotId?: SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    volunteer?: UserOrderByWithRelationInput
    timeslot?: TimeslotOrderByWithRelationInput
    sector?: SectorOrderByWithRelationInput
  }

  export type AffectationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    volunteerId_timeslotId?: AffectationVolunteerIdTimeslotIdCompoundUniqueInput
    AND?: AffectationWhereInput | AffectationWhereInput[]
    OR?: AffectationWhereInput[]
    NOT?: AffectationWhereInput | AffectationWhereInput[]
    number?: IntFilter<"Affectation"> | number
    status?: EnumAffectationStatusFilter<"Affectation"> | $Enums.AffectationStatus
    volunteerId?: StringFilter<"Affectation"> | string
    timeslotId?: StringFilter<"Affectation"> | string
    sectorId?: StringFilter<"Affectation"> | string
    createdAt?: DateTimeFilter<"Affectation"> | Date | string
    updatedAt?: DateTimeFilter<"Affectation"> | Date | string
    volunteer?: XOR<UserScalarRelationFilter, UserWhereInput>
    timeslot?: XOR<TimeslotScalarRelationFilter, TimeslotWhereInput>
    sector?: XOR<SectorScalarRelationFilter, SectorWhereInput>
  }, "id" | "volunteerId_timeslotId">

  export type AffectationOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    volunteerId?: SortOrder
    timeslotId?: SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AffectationCountOrderByAggregateInput
    _avg?: AffectationAvgOrderByAggregateInput
    _max?: AffectationMaxOrderByAggregateInput
    _min?: AffectationMinOrderByAggregateInput
    _sum?: AffectationSumOrderByAggregateInput
  }

  export type AffectationScalarWhereWithAggregatesInput = {
    AND?: AffectationScalarWhereWithAggregatesInput | AffectationScalarWhereWithAggregatesInput[]
    OR?: AffectationScalarWhereWithAggregatesInput[]
    NOT?: AffectationScalarWhereWithAggregatesInput | AffectationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Affectation"> | string
    number?: IntWithAggregatesFilter<"Affectation"> | number
    status?: EnumAffectationStatusWithAggregatesFilter<"Affectation"> | $Enums.AffectationStatus
    volunteerId?: StringWithAggregatesFilter<"Affectation"> | string
    timeslotId?: StringWithAggregatesFilter<"Affectation"> | string
    sectorId?: StringWithAggregatesFilter<"Affectation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Affectation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Affectation"> | Date | string
  }

  export type MissionWhereInput = {
    AND?: MissionWhereInput | MissionWhereInput[]
    OR?: MissionWhereInput[]
    NOT?: MissionWhereInput | MissionWhereInput[]
    id?: StringFilter<"Mission"> | string
    name?: StringFilter<"Mission"> | string
    description?: StringNullableFilter<"Mission"> | string | null
    dateStart?: DateTimeFilter<"Mission"> | Date | string
    dateEnd?: DateTimeFilter<"Mission"> | Date | string
    place?: StringNullableFilter<"Mission"> | string | null
    priority?: EnumMissionPriorityFilter<"Mission"> | $Enums.MissionPriority
    status?: EnumMissionStatusFilter<"Mission"> | $Enums.MissionStatus
    humanResources?: IntFilter<"Mission"> | number
    createdAt?: DateTimeFilter<"Mission"> | Date | string
    updatedAt?: DateTimeFilter<"Mission"> | Date | string
    assignments?: MissionAssignmentListRelationFilter
  }

  export type MissionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
    place?: SortOrderInput | SortOrder
    priority?: SortOrder
    status?: SortOrder
    humanResources?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignments?: MissionAssignmentOrderByRelationAggregateInput
  }

  export type MissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MissionWhereInput | MissionWhereInput[]
    OR?: MissionWhereInput[]
    NOT?: MissionWhereInput | MissionWhereInput[]
    name?: StringFilter<"Mission"> | string
    description?: StringNullableFilter<"Mission"> | string | null
    dateStart?: DateTimeFilter<"Mission"> | Date | string
    dateEnd?: DateTimeFilter<"Mission"> | Date | string
    place?: StringNullableFilter<"Mission"> | string | null
    priority?: EnumMissionPriorityFilter<"Mission"> | $Enums.MissionPriority
    status?: EnumMissionStatusFilter<"Mission"> | $Enums.MissionStatus
    humanResources?: IntFilter<"Mission"> | number
    createdAt?: DateTimeFilter<"Mission"> | Date | string
    updatedAt?: DateTimeFilter<"Mission"> | Date | string
    assignments?: MissionAssignmentListRelationFilter
  }, "id">

  export type MissionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
    place?: SortOrderInput | SortOrder
    priority?: SortOrder
    status?: SortOrder
    humanResources?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MissionCountOrderByAggregateInput
    _avg?: MissionAvgOrderByAggregateInput
    _max?: MissionMaxOrderByAggregateInput
    _min?: MissionMinOrderByAggregateInput
    _sum?: MissionSumOrderByAggregateInput
  }

  export type MissionScalarWhereWithAggregatesInput = {
    AND?: MissionScalarWhereWithAggregatesInput | MissionScalarWhereWithAggregatesInput[]
    OR?: MissionScalarWhereWithAggregatesInput[]
    NOT?: MissionScalarWhereWithAggregatesInput | MissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mission"> | string
    name?: StringWithAggregatesFilter<"Mission"> | string
    description?: StringNullableWithAggregatesFilter<"Mission"> | string | null
    dateStart?: DateTimeWithAggregatesFilter<"Mission"> | Date | string
    dateEnd?: DateTimeWithAggregatesFilter<"Mission"> | Date | string
    place?: StringNullableWithAggregatesFilter<"Mission"> | string | null
    priority?: EnumMissionPriorityWithAggregatesFilter<"Mission"> | $Enums.MissionPriority
    status?: EnumMissionStatusWithAggregatesFilter<"Mission"> | $Enums.MissionStatus
    humanResources?: IntWithAggregatesFilter<"Mission"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Mission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mission"> | Date | string
  }

  export type MissionAssignmentWhereInput = {
    AND?: MissionAssignmentWhereInput | MissionAssignmentWhereInput[]
    OR?: MissionAssignmentWhereInput[]
    NOT?: MissionAssignmentWhereInput | MissionAssignmentWhereInput[]
    id?: StringFilter<"MissionAssignment"> | string
    userId?: StringFilter<"MissionAssignment"> | string
    missionId?: StringFilter<"MissionAssignment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mission?: XOR<MissionScalarRelationFilter, MissionWhereInput>
  }

  export type MissionAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    missionId?: SortOrder
    user?: UserOrderByWithRelationInput
    mission?: MissionOrderByWithRelationInput
  }

  export type MissionAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_missionId?: MissionAssignmentUserIdMissionIdCompoundUniqueInput
    AND?: MissionAssignmentWhereInput | MissionAssignmentWhereInput[]
    OR?: MissionAssignmentWhereInput[]
    NOT?: MissionAssignmentWhereInput | MissionAssignmentWhereInput[]
    userId?: StringFilter<"MissionAssignment"> | string
    missionId?: StringFilter<"MissionAssignment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mission?: XOR<MissionScalarRelationFilter, MissionWhereInput>
  }, "id" | "userId_missionId">

  export type MissionAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    missionId?: SortOrder
    _count?: MissionAssignmentCountOrderByAggregateInput
    _max?: MissionAssignmentMaxOrderByAggregateInput
    _min?: MissionAssignmentMinOrderByAggregateInput
  }

  export type MissionAssignmentScalarWhereWithAggregatesInput = {
    AND?: MissionAssignmentScalarWhereWithAggregatesInput | MissionAssignmentScalarWhereWithAggregatesInput[]
    OR?: MissionAssignmentScalarWhereWithAggregatesInput[]
    NOT?: MissionAssignmentScalarWhereWithAggregatesInput | MissionAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MissionAssignment"> | string
    userId?: StringWithAggregatesFilter<"MissionAssignment"> | string
    missionId?: StringWithAggregatesFilter<"MissionAssignment"> | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: JsonFilter<"Event">
    description?: JsonNullableFilter<"Event">
    category?: EnumEventCategoryFilter<"Event"> | $Enums.EventCategory
    place?: StringNullableFilter<"Event"> | string | null
    day?: StringFilter<"Event"> | string
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeNullableFilter<"Event"> | Date | string | null
    imageSrc?: StringNullableFilter<"Event"> | string | null
    sortOrder?: IntFilter<"Event"> | number
    isActive?: BoolFilter<"Event"> | boolean
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    place?: SortOrderInput | SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    imageSrc?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: JsonFilter<"Event">
    description?: JsonNullableFilter<"Event">
    category?: EnumEventCategoryFilter<"Event"> | $Enums.EventCategory
    place?: StringNullableFilter<"Event"> | string | null
    day?: StringFilter<"Event"> | string
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeNullableFilter<"Event"> | Date | string | null
    imageSrc?: StringNullableFilter<"Event"> | string | null
    sortOrder?: IntFilter<"Event"> | number
    isActive?: BoolFilter<"Event"> | boolean
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    place?: SortOrderInput | SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    imageSrc?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    title?: JsonWithAggregatesFilter<"Event">
    description?: JsonNullableWithAggregatesFilter<"Event">
    category?: EnumEventCategoryWithAggregatesFilter<"Event"> | $Enums.EventCategory
    place?: StringNullableWithAggregatesFilter<"Event"> | string | null
    day?: StringWithAggregatesFilter<"Event"> | string
    startTime?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null
    imageSrc?: StringNullableWithAggregatesFilter<"Event"> | string | null
    sortOrder?: IntWithAggregatesFilter<"Event"> | number
    isActive?: BoolWithAggregatesFilter<"Event"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type PriceWhereInput = {
    AND?: PriceWhereInput | PriceWhereInput[]
    OR?: PriceWhereInput[]
    NOT?: PriceWhereInput | PriceWhereInput[]
    id?: StringFilter<"Price"> | string
    title?: JsonFilter<"Price">
    description?: JsonNullableFilter<"Price">
    amount?: FloatFilter<"Price"> | number
    currency?: StringFilter<"Price"> | string
    category?: StringNullableFilter<"Price"> | string | null
    sortOrder?: IntFilter<"Price"> | number
    isActive?: BoolFilter<"Price"> | boolean
    createdAt?: DateTimeFilter<"Price"> | Date | string
    updatedAt?: DateTimeFilter<"Price"> | Date | string
  }

  export type PriceOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PriceWhereInput | PriceWhereInput[]
    OR?: PriceWhereInput[]
    NOT?: PriceWhereInput | PriceWhereInput[]
    title?: JsonFilter<"Price">
    description?: JsonNullableFilter<"Price">
    amount?: FloatFilter<"Price"> | number
    currency?: StringFilter<"Price"> | string
    category?: StringNullableFilter<"Price"> | string | null
    sortOrder?: IntFilter<"Price"> | number
    isActive?: BoolFilter<"Price"> | boolean
    createdAt?: DateTimeFilter<"Price"> | Date | string
    updatedAt?: DateTimeFilter<"Price"> | Date | string
  }, "id">

  export type PriceOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PriceCountOrderByAggregateInput
    _avg?: PriceAvgOrderByAggregateInput
    _max?: PriceMaxOrderByAggregateInput
    _min?: PriceMinOrderByAggregateInput
    _sum?: PriceSumOrderByAggregateInput
  }

  export type PriceScalarWhereWithAggregatesInput = {
    AND?: PriceScalarWhereWithAggregatesInput | PriceScalarWhereWithAggregatesInput[]
    OR?: PriceScalarWhereWithAggregatesInput[]
    NOT?: PriceScalarWhereWithAggregatesInput | PriceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Price"> | string
    title?: JsonWithAggregatesFilter<"Price">
    description?: JsonNullableWithAggregatesFilter<"Price">
    amount?: FloatWithAggregatesFilter<"Price"> | number
    currency?: StringWithAggregatesFilter<"Price"> | string
    category?: StringNullableWithAggregatesFilter<"Price"> | string | null
    sortOrder?: IntWithAggregatesFilter<"Price"> | number
    isActive?: BoolWithAggregatesFilter<"Price"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Price"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Price"> | Date | string
  }

  export type UsefulInfoWhereInput = {
    AND?: UsefulInfoWhereInput | UsefulInfoWhereInput[]
    OR?: UsefulInfoWhereInput[]
    NOT?: UsefulInfoWhereInput | UsefulInfoWhereInput[]
    id?: StringFilter<"UsefulInfo"> | string
    title?: JsonFilter<"UsefulInfo">
    content?: JsonFilter<"UsefulInfo">
    icon?: StringNullableFilter<"UsefulInfo"> | string | null
    category?: StringNullableFilter<"UsefulInfo"> | string | null
    sortOrder?: IntFilter<"UsefulInfo"> | number
    isActive?: BoolFilter<"UsefulInfo"> | boolean
    createdAt?: DateTimeFilter<"UsefulInfo"> | Date | string
    updatedAt?: DateTimeFilter<"UsefulInfo"> | Date | string
  }

  export type UsefulInfoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    icon?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsefulInfoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UsefulInfoWhereInput | UsefulInfoWhereInput[]
    OR?: UsefulInfoWhereInput[]
    NOT?: UsefulInfoWhereInput | UsefulInfoWhereInput[]
    title?: JsonFilter<"UsefulInfo">
    content?: JsonFilter<"UsefulInfo">
    icon?: StringNullableFilter<"UsefulInfo"> | string | null
    category?: StringNullableFilter<"UsefulInfo"> | string | null
    sortOrder?: IntFilter<"UsefulInfo"> | number
    isActive?: BoolFilter<"UsefulInfo"> | boolean
    createdAt?: DateTimeFilter<"UsefulInfo"> | Date | string
    updatedAt?: DateTimeFilter<"UsefulInfo"> | Date | string
  }, "id">

  export type UsefulInfoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    icon?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsefulInfoCountOrderByAggregateInput
    _avg?: UsefulInfoAvgOrderByAggregateInput
    _max?: UsefulInfoMaxOrderByAggregateInput
    _min?: UsefulInfoMinOrderByAggregateInput
    _sum?: UsefulInfoSumOrderByAggregateInput
  }

  export type UsefulInfoScalarWhereWithAggregatesInput = {
    AND?: UsefulInfoScalarWhereWithAggregatesInput | UsefulInfoScalarWhereWithAggregatesInput[]
    OR?: UsefulInfoScalarWhereWithAggregatesInput[]
    NOT?: UsefulInfoScalarWhereWithAggregatesInput | UsefulInfoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsefulInfo"> | string
    title?: JsonWithAggregatesFilter<"UsefulInfo">
    content?: JsonWithAggregatesFilter<"UsefulInfo">
    icon?: StringNullableWithAggregatesFilter<"UsefulInfo"> | string | null
    category?: StringNullableWithAggregatesFilter<"UsefulInfo"> | string | null
    sortOrder?: IntWithAggregatesFilter<"UsefulInfo"> | number
    isActive?: BoolWithAggregatesFilter<"UsefulInfo"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UsefulInfo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UsefulInfo"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    firstname?: string | null
    surname?: string | null
    phone?: string | null
    role?: $Enums.Role
    isReferent?: boolean
    isActive?: boolean
    status?: string | null
    avatar?: string | null
    notes?: string | null
    skills?: UserCreateskillsInput | string[]
    availability?: UserCreateavailabilityInput | string[]
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastLoginIp?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationCreateNestedManyWithoutVolunteerInput
    missionAssignments?: MissionAssignmentCreateNestedManyWithoutUserInput
    referentSectors?: SectorReferentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    firstname?: string | null
    surname?: string | null
    phone?: string | null
    role?: $Enums.Role
    isReferent?: boolean
    isActive?: boolean
    status?: string | null
    avatar?: string | null
    notes?: string | null
    skills?: UserCreateskillsInput | string[]
    availability?: UserCreateavailabilityInput | string[]
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastLoginIp?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationUncheckedCreateNestedManyWithoutVolunteerInput
    missionAssignments?: MissionAssignmentUncheckedCreateNestedManyWithoutUserInput
    referentSectors?: SectorReferentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUpdateManyWithoutVolunteerNestedInput
    missionAssignments?: MissionAssignmentUpdateManyWithoutUserNestedInput
    referentSectors?: SectorReferentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUncheckedUpdateManyWithoutVolunteerNestedInput
    missionAssignments?: MissionAssignmentUncheckedUpdateManyWithoutUserNestedInput
    referentSectors?: SectorReferentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    firstname?: string | null
    surname?: string | null
    phone?: string | null
    role?: $Enums.Role
    isReferent?: boolean
    isActive?: boolean
    status?: string | null
    avatar?: string | null
    notes?: string | null
    skills?: UserCreateskillsInput | string[]
    availability?: UserCreateavailabilityInput | string[]
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastLoginIp?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectorCreateInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    status?: string | null
    skills?: SectorCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    timeslots?: TimeslotCreateNestedManyWithoutSectorInput
    affectations?: AffectationCreateNestedManyWithoutSectorInput
    referents?: SectorReferentCreateNestedManyWithoutSectorInput
  }

  export type SectorUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    status?: string | null
    skills?: SectorCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    timeslots?: TimeslotUncheckedCreateNestedManyWithoutSectorInput
    affectations?: AffectationUncheckedCreateNestedManyWithoutSectorInput
    referents?: SectorReferentUncheckedCreateNestedManyWithoutSectorInput
  }

  export type SectorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeslots?: TimeslotUpdateManyWithoutSectorNestedInput
    affectations?: AffectationUpdateManyWithoutSectorNestedInput
    referents?: SectorReferentUpdateManyWithoutSectorNestedInput
  }

  export type SectorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeslots?: TimeslotUncheckedUpdateManyWithoutSectorNestedInput
    affectations?: AffectationUncheckedUpdateManyWithoutSectorNestedInput
    referents?: SectorReferentUncheckedUpdateManyWithoutSectorNestedInput
  }

  export type SectorCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    status?: string | null
    skills?: SectorCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectorReferentCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutReferentSectorsInput
    sector: SectorCreateNestedOneWithoutReferentsInput
  }

  export type SectorReferentUncheckedCreateInput = {
    id?: string
    userId: string
    sectorId: string
  }

  export type SectorReferentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutReferentSectorsNestedInput
    sector?: SectorUpdateOneRequiredWithoutReferentsNestedInput
  }

  export type SectorReferentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
  }

  export type SectorReferentCreateManyInput = {
    id?: string
    userId: string
    sectorId: string
  }

  export type SectorReferentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type SectorReferentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
  }

  export type TimeslotCreateInput = {
    id?: string
    name: string
    dateStart?: Date | string | null
    dateEnd?: Date | string | null
    totalVolunteers?: number
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sector: SectorCreateNestedOneWithoutTimeslotsInput
    affectations?: AffectationCreateNestedManyWithoutTimeslotInput
  }

  export type TimeslotUncheckedCreateInput = {
    id?: string
    name: string
    dateStart?: Date | string | null
    dateEnd?: Date | string | null
    totalVolunteers?: number
    details?: string | null
    sectorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationUncheckedCreateNestedManyWithoutTimeslotInput
  }

  export type TimeslotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVolunteers?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sector?: SectorUpdateOneRequiredWithoutTimeslotsNestedInput
    affectations?: AffectationUpdateManyWithoutTimeslotNestedInput
  }

  export type TimeslotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVolunteers?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    sectorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUncheckedUpdateManyWithoutTimeslotNestedInput
  }

  export type TimeslotCreateManyInput = {
    id?: string
    name: string
    dateStart?: Date | string | null
    dateEnd?: Date | string | null
    totalVolunteers?: number
    details?: string | null
    sectorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeslotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVolunteers?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimeslotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVolunteers?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    sectorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffectationCreateInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    volunteer: UserCreateNestedOneWithoutAffectationsInput
    timeslot: TimeslotCreateNestedOneWithoutAffectationsInput
    sector: SectorCreateNestedOneWithoutAffectationsInput
  }

  export type AffectationUncheckedCreateInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    volunteerId: string
    timeslotId: string
    sectorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffectationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteer?: UserUpdateOneRequiredWithoutAffectationsNestedInput
    timeslot?: TimeslotUpdateOneRequiredWithoutAffectationsNestedInput
    sector?: SectorUpdateOneRequiredWithoutAffectationsNestedInput
  }

  export type AffectationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    volunteerId?: StringFieldUpdateOperationsInput | string
    timeslotId?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffectationCreateManyInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    volunteerId: string
    timeslotId: string
    sectorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffectationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffectationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    volunteerId?: StringFieldUpdateOperationsInput | string
    timeslotId?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionCreateInput = {
    id?: string
    name: string
    description?: string | null
    dateStart: Date | string
    dateEnd: Date | string
    place?: string | null
    priority?: $Enums.MissionPriority
    status?: $Enums.MissionStatus
    humanResources?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: MissionAssignmentCreateNestedManyWithoutMissionInput
  }

  export type MissionUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    dateStart: Date | string
    dateEnd: Date | string
    place?: string | null
    priority?: $Enums.MissionPriority
    status?: $Enums.MissionStatus
    humanResources?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: MissionAssignmentUncheckedCreateNestedManyWithoutMissionInput
  }

  export type MissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumMissionPriorityFieldUpdateOperationsInput | $Enums.MissionPriority
    status?: EnumMissionStatusFieldUpdateOperationsInput | $Enums.MissionStatus
    humanResources?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: MissionAssignmentUpdateManyWithoutMissionNestedInput
  }

  export type MissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumMissionPriorityFieldUpdateOperationsInput | $Enums.MissionPriority
    status?: EnumMissionStatusFieldUpdateOperationsInput | $Enums.MissionStatus
    humanResources?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: MissionAssignmentUncheckedUpdateManyWithoutMissionNestedInput
  }

  export type MissionCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    dateStart: Date | string
    dateEnd: Date | string
    place?: string | null
    priority?: $Enums.MissionPriority
    status?: $Enums.MissionStatus
    humanResources?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumMissionPriorityFieldUpdateOperationsInput | $Enums.MissionPriority
    status?: EnumMissionStatusFieldUpdateOperationsInput | $Enums.MissionStatus
    humanResources?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumMissionPriorityFieldUpdateOperationsInput | $Enums.MissionPriority
    status?: EnumMissionStatusFieldUpdateOperationsInput | $Enums.MissionStatus
    humanResources?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionAssignmentCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutMissionAssignmentsInput
    mission: MissionCreateNestedOneWithoutAssignmentsInput
  }

  export type MissionAssignmentUncheckedCreateInput = {
    id?: string
    userId: string
    missionId: string
  }

  export type MissionAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutMissionAssignmentsNestedInput
    mission?: MissionUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type MissionAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    missionId?: StringFieldUpdateOperationsInput | string
  }

  export type MissionAssignmentCreateManyInput = {
    id?: string
    userId: string
    missionId: string
  }

  export type MissionAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type MissionAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    missionId?: StringFieldUpdateOperationsInput | string
  }

  export type EventCreateInput = {
    id?: string
    title: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    category: $Enums.EventCategory
    place?: string | null
    day: string
    startTime: Date | string
    endTime?: Date | string | null
    imageSrc?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUncheckedCreateInput = {
    id?: string
    title: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    category: $Enums.EventCategory
    place?: string | null
    day: string
    startTime: Date | string
    endTime?: Date | string | null
    imageSrc?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    place?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageSrc?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    place?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageSrc?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateManyInput = {
    id?: string
    title: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    category: $Enums.EventCategory
    place?: string | null
    day: string
    startTime: Date | string
    endTime?: Date | string | null
    imageSrc?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    place?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageSrc?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    place?: NullableStringFieldUpdateOperationsInput | string | null
    day?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageSrc?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceCreateInput = {
    id?: string
    title: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    currency?: string
    category?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceUncheckedCreateInput = {
    id?: string
    title: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    currency?: string
    category?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceCreateManyInput = {
    id?: string
    title: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    amount: number
    currency?: string
    category?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    description?: NullableJsonNullValueInput | InputJsonValue
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsefulInfoCreateInput = {
    id?: string
    title: JsonNullValueInput | InputJsonValue
    content: JsonNullValueInput | InputJsonValue
    icon?: string | null
    category?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsefulInfoUncheckedCreateInput = {
    id?: string
    title: JsonNullValueInput | InputJsonValue
    content: JsonNullValueInput | InputJsonValue
    icon?: string | null
    category?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsefulInfoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsefulInfoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsefulInfoCreateManyInput = {
    id?: string
    title: JsonNullValueInput | InputJsonValue
    content: JsonNullValueInput | InputJsonValue
    icon?: string | null
    category?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsefulInfoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsefulInfoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AffectationListRelationFilter = {
    every?: AffectationWhereInput
    some?: AffectationWhereInput
    none?: AffectationWhereInput
  }

  export type MissionAssignmentListRelationFilter = {
    every?: MissionAssignmentWhereInput
    some?: MissionAssignmentWhereInput
    none?: MissionAssignmentWhereInput
  }

  export type SectorReferentListRelationFilter = {
    every?: SectorReferentWhereInput
    some?: SectorReferentWhereInput
    none?: SectorReferentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AffectationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MissionAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SectorReferentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    firstname?: SortOrder
    surname?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isReferent?: SortOrder
    isActive?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    notes?: SortOrder
    skills?: SortOrder
    availability?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    lastLoginAt?: SortOrder
    lastLoginIp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    failedLoginAttempts?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    firstname?: SortOrder
    surname?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isReferent?: SortOrder
    isActive?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    notes?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    lastLoginAt?: SortOrder
    lastLoginIp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    firstname?: SortOrder
    surname?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isReferent?: SortOrder
    isActive?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    notes?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    lastLoginAt?: SortOrder
    lastLoginIp?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    failedLoginAttempts?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TimeslotListRelationFilter = {
    every?: TimeslotWhereInput
    some?: TimeslotWhereInput
    none?: TimeslotWhereInput
  }

  export type TimeslotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SectorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    status?: SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    color?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SectorScalarRelationFilter = {
    is?: SectorWhereInput
    isNot?: SectorWhereInput
  }

  export type SectorReferentUserIdSectorIdCompoundUniqueInput = {
    userId: string
    sectorId: string
  }

  export type SectorReferentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sectorId?: SortOrder
  }

  export type SectorReferentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sectorId?: SortOrder
  }

  export type SectorReferentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sectorId?: SortOrder
  }

  export type TimeslotCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
    totalVolunteers?: SortOrder
    details?: SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeslotAvgOrderByAggregateInput = {
    totalVolunteers?: SortOrder
  }

  export type TimeslotMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
    totalVolunteers?: SortOrder
    details?: SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeslotMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
    totalVolunteers?: SortOrder
    details?: SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TimeslotSumOrderByAggregateInput = {
    totalVolunteers?: SortOrder
  }

  export type EnumAffectationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AffectationStatus | EnumAffectationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AffectationStatus[] | ListEnumAffectationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AffectationStatus[] | ListEnumAffectationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAffectationStatusFilter<$PrismaModel> | $Enums.AffectationStatus
  }

  export type TimeslotScalarRelationFilter = {
    is?: TimeslotWhereInput
    isNot?: TimeslotWhereInput
  }

  export type AffectationVolunteerIdTimeslotIdCompoundUniqueInput = {
    volunteerId: string
    timeslotId: string
  }

  export type AffectationCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    volunteerId?: SortOrder
    timeslotId?: SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffectationAvgOrderByAggregateInput = {
    number?: SortOrder
  }

  export type AffectationMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    volunteerId?: SortOrder
    timeslotId?: SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffectationMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    status?: SortOrder
    volunteerId?: SortOrder
    timeslotId?: SortOrder
    sectorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AffectationSumOrderByAggregateInput = {
    number?: SortOrder
  }

  export type EnumAffectationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AffectationStatus | EnumAffectationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AffectationStatus[] | ListEnumAffectationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AffectationStatus[] | ListEnumAffectationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAffectationStatusWithAggregatesFilter<$PrismaModel> | $Enums.AffectationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAffectationStatusFilter<$PrismaModel>
    _max?: NestedEnumAffectationStatusFilter<$PrismaModel>
  }

  export type EnumMissionPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.MissionPriority | EnumMissionPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.MissionPriority[] | ListEnumMissionPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.MissionPriority[] | ListEnumMissionPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumMissionPriorityFilter<$PrismaModel> | $Enums.MissionPriority
  }

  export type EnumMissionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MissionStatus | EnumMissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MissionStatus[] | ListEnumMissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MissionStatus[] | ListEnumMissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMissionStatusFilter<$PrismaModel> | $Enums.MissionStatus
  }

  export type MissionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
    place?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    humanResources?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MissionAvgOrderByAggregateInput = {
    humanResources?: SortOrder
  }

  export type MissionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
    place?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    humanResources?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MissionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
    place?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    humanResources?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MissionSumOrderByAggregateInput = {
    humanResources?: SortOrder
  }

  export type EnumMissionPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MissionPriority | EnumMissionPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.MissionPriority[] | ListEnumMissionPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.MissionPriority[] | ListEnumMissionPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumMissionPriorityWithAggregatesFilter<$PrismaModel> | $Enums.MissionPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMissionPriorityFilter<$PrismaModel>
    _max?: NestedEnumMissionPriorityFilter<$PrismaModel>
  }

  export type EnumMissionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MissionStatus | EnumMissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MissionStatus[] | ListEnumMissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MissionStatus[] | ListEnumMissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMissionStatusWithAggregatesFilter<$PrismaModel> | $Enums.MissionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMissionStatusFilter<$PrismaModel>
    _max?: NestedEnumMissionStatusFilter<$PrismaModel>
  }

  export type MissionScalarRelationFilter = {
    is?: MissionWhereInput
    isNot?: MissionWhereInput
  }

  export type MissionAssignmentUserIdMissionIdCompoundUniqueInput = {
    userId: string
    missionId: string
  }

  export type MissionAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    missionId?: SortOrder
  }

  export type MissionAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    missionId?: SortOrder
  }

  export type MissionAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    missionId?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumEventCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.EventCategory | EnumEventCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumEventCategoryFilter<$PrismaModel> | $Enums.EventCategory
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    place?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    imageSrc?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    place?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    imageSrc?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    place?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    imageSrc?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumEventCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventCategory | EnumEventCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumEventCategoryWithAggregatesFilter<$PrismaModel> | $Enums.EventCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventCategoryFilter<$PrismaModel>
    _max?: NestedEnumEventCategoryFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PriceCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceAvgOrderByAggregateInput = {
    amount?: SortOrder
    sortOrder?: SortOrder
  }

  export type PriceMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceSumOrderByAggregateInput = {
    amount?: SortOrder
    sortOrder?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UsefulInfoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    icon?: SortOrder
    category?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsefulInfoAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type UsefulInfoMaxOrderByAggregateInput = {
    id?: SortOrder
    icon?: SortOrder
    category?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsefulInfoMinOrderByAggregateInput = {
    id?: SortOrder
    icon?: SortOrder
    category?: SortOrder
    sortOrder?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsefulInfoSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type UserCreateskillsInput = {
    set: string[]
  }

  export type UserCreateavailabilityInput = {
    set: string[]
  }

  export type AffectationCreateNestedManyWithoutVolunteerInput = {
    create?: XOR<AffectationCreateWithoutVolunteerInput, AffectationUncheckedCreateWithoutVolunteerInput> | AffectationCreateWithoutVolunteerInput[] | AffectationUncheckedCreateWithoutVolunteerInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutVolunteerInput | AffectationCreateOrConnectWithoutVolunteerInput[]
    createMany?: AffectationCreateManyVolunteerInputEnvelope
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
  }

  export type MissionAssignmentCreateNestedManyWithoutUserInput = {
    create?: XOR<MissionAssignmentCreateWithoutUserInput, MissionAssignmentUncheckedCreateWithoutUserInput> | MissionAssignmentCreateWithoutUserInput[] | MissionAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MissionAssignmentCreateOrConnectWithoutUserInput | MissionAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: MissionAssignmentCreateManyUserInputEnvelope
    connect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
  }

  export type SectorReferentCreateNestedManyWithoutUserInput = {
    create?: XOR<SectorReferentCreateWithoutUserInput, SectorReferentUncheckedCreateWithoutUserInput> | SectorReferentCreateWithoutUserInput[] | SectorReferentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SectorReferentCreateOrConnectWithoutUserInput | SectorReferentCreateOrConnectWithoutUserInput[]
    createMany?: SectorReferentCreateManyUserInputEnvelope
    connect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
  }

  export type AffectationUncheckedCreateNestedManyWithoutVolunteerInput = {
    create?: XOR<AffectationCreateWithoutVolunteerInput, AffectationUncheckedCreateWithoutVolunteerInput> | AffectationCreateWithoutVolunteerInput[] | AffectationUncheckedCreateWithoutVolunteerInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutVolunteerInput | AffectationCreateOrConnectWithoutVolunteerInput[]
    createMany?: AffectationCreateManyVolunteerInputEnvelope
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
  }

  export type MissionAssignmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MissionAssignmentCreateWithoutUserInput, MissionAssignmentUncheckedCreateWithoutUserInput> | MissionAssignmentCreateWithoutUserInput[] | MissionAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MissionAssignmentCreateOrConnectWithoutUserInput | MissionAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: MissionAssignmentCreateManyUserInputEnvelope
    connect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
  }

  export type SectorReferentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SectorReferentCreateWithoutUserInput, SectorReferentUncheckedCreateWithoutUserInput> | SectorReferentCreateWithoutUserInput[] | SectorReferentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SectorReferentCreateOrConnectWithoutUserInput | SectorReferentCreateOrConnectWithoutUserInput[]
    createMany?: SectorReferentCreateManyUserInputEnvelope
    connect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateavailabilityInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AffectationUpdateManyWithoutVolunteerNestedInput = {
    create?: XOR<AffectationCreateWithoutVolunteerInput, AffectationUncheckedCreateWithoutVolunteerInput> | AffectationCreateWithoutVolunteerInput[] | AffectationUncheckedCreateWithoutVolunteerInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutVolunteerInput | AffectationCreateOrConnectWithoutVolunteerInput[]
    upsert?: AffectationUpsertWithWhereUniqueWithoutVolunteerInput | AffectationUpsertWithWhereUniqueWithoutVolunteerInput[]
    createMany?: AffectationCreateManyVolunteerInputEnvelope
    set?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    disconnect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    delete?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    update?: AffectationUpdateWithWhereUniqueWithoutVolunteerInput | AffectationUpdateWithWhereUniqueWithoutVolunteerInput[]
    updateMany?: AffectationUpdateManyWithWhereWithoutVolunteerInput | AffectationUpdateManyWithWhereWithoutVolunteerInput[]
    deleteMany?: AffectationScalarWhereInput | AffectationScalarWhereInput[]
  }

  export type MissionAssignmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<MissionAssignmentCreateWithoutUserInput, MissionAssignmentUncheckedCreateWithoutUserInput> | MissionAssignmentCreateWithoutUserInput[] | MissionAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MissionAssignmentCreateOrConnectWithoutUserInput | MissionAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: MissionAssignmentUpsertWithWhereUniqueWithoutUserInput | MissionAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MissionAssignmentCreateManyUserInputEnvelope
    set?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    disconnect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    delete?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    connect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    update?: MissionAssignmentUpdateWithWhereUniqueWithoutUserInput | MissionAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MissionAssignmentUpdateManyWithWhereWithoutUserInput | MissionAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MissionAssignmentScalarWhereInput | MissionAssignmentScalarWhereInput[]
  }

  export type SectorReferentUpdateManyWithoutUserNestedInput = {
    create?: XOR<SectorReferentCreateWithoutUserInput, SectorReferentUncheckedCreateWithoutUserInput> | SectorReferentCreateWithoutUserInput[] | SectorReferentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SectorReferentCreateOrConnectWithoutUserInput | SectorReferentCreateOrConnectWithoutUserInput[]
    upsert?: SectorReferentUpsertWithWhereUniqueWithoutUserInput | SectorReferentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SectorReferentCreateManyUserInputEnvelope
    set?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    disconnect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    delete?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    connect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    update?: SectorReferentUpdateWithWhereUniqueWithoutUserInput | SectorReferentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SectorReferentUpdateManyWithWhereWithoutUserInput | SectorReferentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SectorReferentScalarWhereInput | SectorReferentScalarWhereInput[]
  }

  export type AffectationUncheckedUpdateManyWithoutVolunteerNestedInput = {
    create?: XOR<AffectationCreateWithoutVolunteerInput, AffectationUncheckedCreateWithoutVolunteerInput> | AffectationCreateWithoutVolunteerInput[] | AffectationUncheckedCreateWithoutVolunteerInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutVolunteerInput | AffectationCreateOrConnectWithoutVolunteerInput[]
    upsert?: AffectationUpsertWithWhereUniqueWithoutVolunteerInput | AffectationUpsertWithWhereUniqueWithoutVolunteerInput[]
    createMany?: AffectationCreateManyVolunteerInputEnvelope
    set?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    disconnect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    delete?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    update?: AffectationUpdateWithWhereUniqueWithoutVolunteerInput | AffectationUpdateWithWhereUniqueWithoutVolunteerInput[]
    updateMany?: AffectationUpdateManyWithWhereWithoutVolunteerInput | AffectationUpdateManyWithWhereWithoutVolunteerInput[]
    deleteMany?: AffectationScalarWhereInput | AffectationScalarWhereInput[]
  }

  export type MissionAssignmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MissionAssignmentCreateWithoutUserInput, MissionAssignmentUncheckedCreateWithoutUserInput> | MissionAssignmentCreateWithoutUserInput[] | MissionAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MissionAssignmentCreateOrConnectWithoutUserInput | MissionAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: MissionAssignmentUpsertWithWhereUniqueWithoutUserInput | MissionAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MissionAssignmentCreateManyUserInputEnvelope
    set?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    disconnect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    delete?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    connect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    update?: MissionAssignmentUpdateWithWhereUniqueWithoutUserInput | MissionAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MissionAssignmentUpdateManyWithWhereWithoutUserInput | MissionAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MissionAssignmentScalarWhereInput | MissionAssignmentScalarWhereInput[]
  }

  export type SectorReferentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SectorReferentCreateWithoutUserInput, SectorReferentUncheckedCreateWithoutUserInput> | SectorReferentCreateWithoutUserInput[] | SectorReferentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SectorReferentCreateOrConnectWithoutUserInput | SectorReferentCreateOrConnectWithoutUserInput[]
    upsert?: SectorReferentUpsertWithWhereUniqueWithoutUserInput | SectorReferentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SectorReferentCreateManyUserInputEnvelope
    set?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    disconnect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    delete?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    connect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    update?: SectorReferentUpdateWithWhereUniqueWithoutUserInput | SectorReferentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SectorReferentUpdateManyWithWhereWithoutUserInput | SectorReferentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SectorReferentScalarWhereInput | SectorReferentScalarWhereInput[]
  }

  export type SectorCreateskillsInput = {
    set: string[]
  }

  export type TimeslotCreateNestedManyWithoutSectorInput = {
    create?: XOR<TimeslotCreateWithoutSectorInput, TimeslotUncheckedCreateWithoutSectorInput> | TimeslotCreateWithoutSectorInput[] | TimeslotUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: TimeslotCreateOrConnectWithoutSectorInput | TimeslotCreateOrConnectWithoutSectorInput[]
    createMany?: TimeslotCreateManySectorInputEnvelope
    connect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
  }

  export type AffectationCreateNestedManyWithoutSectorInput = {
    create?: XOR<AffectationCreateWithoutSectorInput, AffectationUncheckedCreateWithoutSectorInput> | AffectationCreateWithoutSectorInput[] | AffectationUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutSectorInput | AffectationCreateOrConnectWithoutSectorInput[]
    createMany?: AffectationCreateManySectorInputEnvelope
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
  }

  export type SectorReferentCreateNestedManyWithoutSectorInput = {
    create?: XOR<SectorReferentCreateWithoutSectorInput, SectorReferentUncheckedCreateWithoutSectorInput> | SectorReferentCreateWithoutSectorInput[] | SectorReferentUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: SectorReferentCreateOrConnectWithoutSectorInput | SectorReferentCreateOrConnectWithoutSectorInput[]
    createMany?: SectorReferentCreateManySectorInputEnvelope
    connect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
  }

  export type TimeslotUncheckedCreateNestedManyWithoutSectorInput = {
    create?: XOR<TimeslotCreateWithoutSectorInput, TimeslotUncheckedCreateWithoutSectorInput> | TimeslotCreateWithoutSectorInput[] | TimeslotUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: TimeslotCreateOrConnectWithoutSectorInput | TimeslotCreateOrConnectWithoutSectorInput[]
    createMany?: TimeslotCreateManySectorInputEnvelope
    connect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
  }

  export type AffectationUncheckedCreateNestedManyWithoutSectorInput = {
    create?: XOR<AffectationCreateWithoutSectorInput, AffectationUncheckedCreateWithoutSectorInput> | AffectationCreateWithoutSectorInput[] | AffectationUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutSectorInput | AffectationCreateOrConnectWithoutSectorInput[]
    createMany?: AffectationCreateManySectorInputEnvelope
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
  }

  export type SectorReferentUncheckedCreateNestedManyWithoutSectorInput = {
    create?: XOR<SectorReferentCreateWithoutSectorInput, SectorReferentUncheckedCreateWithoutSectorInput> | SectorReferentCreateWithoutSectorInput[] | SectorReferentUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: SectorReferentCreateOrConnectWithoutSectorInput | SectorReferentCreateOrConnectWithoutSectorInput[]
    createMany?: SectorReferentCreateManySectorInputEnvelope
    connect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
  }

  export type SectorUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TimeslotUpdateManyWithoutSectorNestedInput = {
    create?: XOR<TimeslotCreateWithoutSectorInput, TimeslotUncheckedCreateWithoutSectorInput> | TimeslotCreateWithoutSectorInput[] | TimeslotUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: TimeslotCreateOrConnectWithoutSectorInput | TimeslotCreateOrConnectWithoutSectorInput[]
    upsert?: TimeslotUpsertWithWhereUniqueWithoutSectorInput | TimeslotUpsertWithWhereUniqueWithoutSectorInput[]
    createMany?: TimeslotCreateManySectorInputEnvelope
    set?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    disconnect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    delete?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    connect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    update?: TimeslotUpdateWithWhereUniqueWithoutSectorInput | TimeslotUpdateWithWhereUniqueWithoutSectorInput[]
    updateMany?: TimeslotUpdateManyWithWhereWithoutSectorInput | TimeslotUpdateManyWithWhereWithoutSectorInput[]
    deleteMany?: TimeslotScalarWhereInput | TimeslotScalarWhereInput[]
  }

  export type AffectationUpdateManyWithoutSectorNestedInput = {
    create?: XOR<AffectationCreateWithoutSectorInput, AffectationUncheckedCreateWithoutSectorInput> | AffectationCreateWithoutSectorInput[] | AffectationUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutSectorInput | AffectationCreateOrConnectWithoutSectorInput[]
    upsert?: AffectationUpsertWithWhereUniqueWithoutSectorInput | AffectationUpsertWithWhereUniqueWithoutSectorInput[]
    createMany?: AffectationCreateManySectorInputEnvelope
    set?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    disconnect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    delete?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    update?: AffectationUpdateWithWhereUniqueWithoutSectorInput | AffectationUpdateWithWhereUniqueWithoutSectorInput[]
    updateMany?: AffectationUpdateManyWithWhereWithoutSectorInput | AffectationUpdateManyWithWhereWithoutSectorInput[]
    deleteMany?: AffectationScalarWhereInput | AffectationScalarWhereInput[]
  }

  export type SectorReferentUpdateManyWithoutSectorNestedInput = {
    create?: XOR<SectorReferentCreateWithoutSectorInput, SectorReferentUncheckedCreateWithoutSectorInput> | SectorReferentCreateWithoutSectorInput[] | SectorReferentUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: SectorReferentCreateOrConnectWithoutSectorInput | SectorReferentCreateOrConnectWithoutSectorInput[]
    upsert?: SectorReferentUpsertWithWhereUniqueWithoutSectorInput | SectorReferentUpsertWithWhereUniqueWithoutSectorInput[]
    createMany?: SectorReferentCreateManySectorInputEnvelope
    set?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    disconnect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    delete?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    connect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    update?: SectorReferentUpdateWithWhereUniqueWithoutSectorInput | SectorReferentUpdateWithWhereUniqueWithoutSectorInput[]
    updateMany?: SectorReferentUpdateManyWithWhereWithoutSectorInput | SectorReferentUpdateManyWithWhereWithoutSectorInput[]
    deleteMany?: SectorReferentScalarWhereInput | SectorReferentScalarWhereInput[]
  }

  export type TimeslotUncheckedUpdateManyWithoutSectorNestedInput = {
    create?: XOR<TimeslotCreateWithoutSectorInput, TimeslotUncheckedCreateWithoutSectorInput> | TimeslotCreateWithoutSectorInput[] | TimeslotUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: TimeslotCreateOrConnectWithoutSectorInput | TimeslotCreateOrConnectWithoutSectorInput[]
    upsert?: TimeslotUpsertWithWhereUniqueWithoutSectorInput | TimeslotUpsertWithWhereUniqueWithoutSectorInput[]
    createMany?: TimeslotCreateManySectorInputEnvelope
    set?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    disconnect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    delete?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    connect?: TimeslotWhereUniqueInput | TimeslotWhereUniqueInput[]
    update?: TimeslotUpdateWithWhereUniqueWithoutSectorInput | TimeslotUpdateWithWhereUniqueWithoutSectorInput[]
    updateMany?: TimeslotUpdateManyWithWhereWithoutSectorInput | TimeslotUpdateManyWithWhereWithoutSectorInput[]
    deleteMany?: TimeslotScalarWhereInput | TimeslotScalarWhereInput[]
  }

  export type AffectationUncheckedUpdateManyWithoutSectorNestedInput = {
    create?: XOR<AffectationCreateWithoutSectorInput, AffectationUncheckedCreateWithoutSectorInput> | AffectationCreateWithoutSectorInput[] | AffectationUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutSectorInput | AffectationCreateOrConnectWithoutSectorInput[]
    upsert?: AffectationUpsertWithWhereUniqueWithoutSectorInput | AffectationUpsertWithWhereUniqueWithoutSectorInput[]
    createMany?: AffectationCreateManySectorInputEnvelope
    set?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    disconnect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    delete?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    update?: AffectationUpdateWithWhereUniqueWithoutSectorInput | AffectationUpdateWithWhereUniqueWithoutSectorInput[]
    updateMany?: AffectationUpdateManyWithWhereWithoutSectorInput | AffectationUpdateManyWithWhereWithoutSectorInput[]
    deleteMany?: AffectationScalarWhereInput | AffectationScalarWhereInput[]
  }

  export type SectorReferentUncheckedUpdateManyWithoutSectorNestedInput = {
    create?: XOR<SectorReferentCreateWithoutSectorInput, SectorReferentUncheckedCreateWithoutSectorInput> | SectorReferentCreateWithoutSectorInput[] | SectorReferentUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: SectorReferentCreateOrConnectWithoutSectorInput | SectorReferentCreateOrConnectWithoutSectorInput[]
    upsert?: SectorReferentUpsertWithWhereUniqueWithoutSectorInput | SectorReferentUpsertWithWhereUniqueWithoutSectorInput[]
    createMany?: SectorReferentCreateManySectorInputEnvelope
    set?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    disconnect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    delete?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    connect?: SectorReferentWhereUniqueInput | SectorReferentWhereUniqueInput[]
    update?: SectorReferentUpdateWithWhereUniqueWithoutSectorInput | SectorReferentUpdateWithWhereUniqueWithoutSectorInput[]
    updateMany?: SectorReferentUpdateManyWithWhereWithoutSectorInput | SectorReferentUpdateManyWithWhereWithoutSectorInput[]
    deleteMany?: SectorReferentScalarWhereInput | SectorReferentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutReferentSectorsInput = {
    create?: XOR<UserCreateWithoutReferentSectorsInput, UserUncheckedCreateWithoutReferentSectorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferentSectorsInput
    connect?: UserWhereUniqueInput
  }

  export type SectorCreateNestedOneWithoutReferentsInput = {
    create?: XOR<SectorCreateWithoutReferentsInput, SectorUncheckedCreateWithoutReferentsInput>
    connectOrCreate?: SectorCreateOrConnectWithoutReferentsInput
    connect?: SectorWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutReferentSectorsNestedInput = {
    create?: XOR<UserCreateWithoutReferentSectorsInput, UserUncheckedCreateWithoutReferentSectorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReferentSectorsInput
    upsert?: UserUpsertWithoutReferentSectorsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReferentSectorsInput, UserUpdateWithoutReferentSectorsInput>, UserUncheckedUpdateWithoutReferentSectorsInput>
  }

  export type SectorUpdateOneRequiredWithoutReferentsNestedInput = {
    create?: XOR<SectorCreateWithoutReferentsInput, SectorUncheckedCreateWithoutReferentsInput>
    connectOrCreate?: SectorCreateOrConnectWithoutReferentsInput
    upsert?: SectorUpsertWithoutReferentsInput
    connect?: SectorWhereUniqueInput
    update?: XOR<XOR<SectorUpdateToOneWithWhereWithoutReferentsInput, SectorUpdateWithoutReferentsInput>, SectorUncheckedUpdateWithoutReferentsInput>
  }

  export type SectorCreateNestedOneWithoutTimeslotsInput = {
    create?: XOR<SectorCreateWithoutTimeslotsInput, SectorUncheckedCreateWithoutTimeslotsInput>
    connectOrCreate?: SectorCreateOrConnectWithoutTimeslotsInput
    connect?: SectorWhereUniqueInput
  }

  export type AffectationCreateNestedManyWithoutTimeslotInput = {
    create?: XOR<AffectationCreateWithoutTimeslotInput, AffectationUncheckedCreateWithoutTimeslotInput> | AffectationCreateWithoutTimeslotInput[] | AffectationUncheckedCreateWithoutTimeslotInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutTimeslotInput | AffectationCreateOrConnectWithoutTimeslotInput[]
    createMany?: AffectationCreateManyTimeslotInputEnvelope
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
  }

  export type AffectationUncheckedCreateNestedManyWithoutTimeslotInput = {
    create?: XOR<AffectationCreateWithoutTimeslotInput, AffectationUncheckedCreateWithoutTimeslotInput> | AffectationCreateWithoutTimeslotInput[] | AffectationUncheckedCreateWithoutTimeslotInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutTimeslotInput | AffectationCreateOrConnectWithoutTimeslotInput[]
    createMany?: AffectationCreateManyTimeslotInputEnvelope
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
  }

  export type SectorUpdateOneRequiredWithoutTimeslotsNestedInput = {
    create?: XOR<SectorCreateWithoutTimeslotsInput, SectorUncheckedCreateWithoutTimeslotsInput>
    connectOrCreate?: SectorCreateOrConnectWithoutTimeslotsInput
    upsert?: SectorUpsertWithoutTimeslotsInput
    connect?: SectorWhereUniqueInput
    update?: XOR<XOR<SectorUpdateToOneWithWhereWithoutTimeslotsInput, SectorUpdateWithoutTimeslotsInput>, SectorUncheckedUpdateWithoutTimeslotsInput>
  }

  export type AffectationUpdateManyWithoutTimeslotNestedInput = {
    create?: XOR<AffectationCreateWithoutTimeslotInput, AffectationUncheckedCreateWithoutTimeslotInput> | AffectationCreateWithoutTimeslotInput[] | AffectationUncheckedCreateWithoutTimeslotInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutTimeslotInput | AffectationCreateOrConnectWithoutTimeslotInput[]
    upsert?: AffectationUpsertWithWhereUniqueWithoutTimeslotInput | AffectationUpsertWithWhereUniqueWithoutTimeslotInput[]
    createMany?: AffectationCreateManyTimeslotInputEnvelope
    set?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    disconnect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    delete?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    update?: AffectationUpdateWithWhereUniqueWithoutTimeslotInput | AffectationUpdateWithWhereUniqueWithoutTimeslotInput[]
    updateMany?: AffectationUpdateManyWithWhereWithoutTimeslotInput | AffectationUpdateManyWithWhereWithoutTimeslotInput[]
    deleteMany?: AffectationScalarWhereInput | AffectationScalarWhereInput[]
  }

  export type AffectationUncheckedUpdateManyWithoutTimeslotNestedInput = {
    create?: XOR<AffectationCreateWithoutTimeslotInput, AffectationUncheckedCreateWithoutTimeslotInput> | AffectationCreateWithoutTimeslotInput[] | AffectationUncheckedCreateWithoutTimeslotInput[]
    connectOrCreate?: AffectationCreateOrConnectWithoutTimeslotInput | AffectationCreateOrConnectWithoutTimeslotInput[]
    upsert?: AffectationUpsertWithWhereUniqueWithoutTimeslotInput | AffectationUpsertWithWhereUniqueWithoutTimeslotInput[]
    createMany?: AffectationCreateManyTimeslotInputEnvelope
    set?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    disconnect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    delete?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    connect?: AffectationWhereUniqueInput | AffectationWhereUniqueInput[]
    update?: AffectationUpdateWithWhereUniqueWithoutTimeslotInput | AffectationUpdateWithWhereUniqueWithoutTimeslotInput[]
    updateMany?: AffectationUpdateManyWithWhereWithoutTimeslotInput | AffectationUpdateManyWithWhereWithoutTimeslotInput[]
    deleteMany?: AffectationScalarWhereInput | AffectationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAffectationsInput = {
    create?: XOR<UserCreateWithoutAffectationsInput, UserUncheckedCreateWithoutAffectationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffectationsInput
    connect?: UserWhereUniqueInput
  }

  export type TimeslotCreateNestedOneWithoutAffectationsInput = {
    create?: XOR<TimeslotCreateWithoutAffectationsInput, TimeslotUncheckedCreateWithoutAffectationsInput>
    connectOrCreate?: TimeslotCreateOrConnectWithoutAffectationsInput
    connect?: TimeslotWhereUniqueInput
  }

  export type SectorCreateNestedOneWithoutAffectationsInput = {
    create?: XOR<SectorCreateWithoutAffectationsInput, SectorUncheckedCreateWithoutAffectationsInput>
    connectOrCreate?: SectorCreateOrConnectWithoutAffectationsInput
    connect?: SectorWhereUniqueInput
  }

  export type EnumAffectationStatusFieldUpdateOperationsInput = {
    set?: $Enums.AffectationStatus
  }

  export type UserUpdateOneRequiredWithoutAffectationsNestedInput = {
    create?: XOR<UserCreateWithoutAffectationsInput, UserUncheckedCreateWithoutAffectationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffectationsInput
    upsert?: UserUpsertWithoutAffectationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAffectationsInput, UserUpdateWithoutAffectationsInput>, UserUncheckedUpdateWithoutAffectationsInput>
  }

  export type TimeslotUpdateOneRequiredWithoutAffectationsNestedInput = {
    create?: XOR<TimeslotCreateWithoutAffectationsInput, TimeslotUncheckedCreateWithoutAffectationsInput>
    connectOrCreate?: TimeslotCreateOrConnectWithoutAffectationsInput
    upsert?: TimeslotUpsertWithoutAffectationsInput
    connect?: TimeslotWhereUniqueInput
    update?: XOR<XOR<TimeslotUpdateToOneWithWhereWithoutAffectationsInput, TimeslotUpdateWithoutAffectationsInput>, TimeslotUncheckedUpdateWithoutAffectationsInput>
  }

  export type SectorUpdateOneRequiredWithoutAffectationsNestedInput = {
    create?: XOR<SectorCreateWithoutAffectationsInput, SectorUncheckedCreateWithoutAffectationsInput>
    connectOrCreate?: SectorCreateOrConnectWithoutAffectationsInput
    upsert?: SectorUpsertWithoutAffectationsInput
    connect?: SectorWhereUniqueInput
    update?: XOR<XOR<SectorUpdateToOneWithWhereWithoutAffectationsInput, SectorUpdateWithoutAffectationsInput>, SectorUncheckedUpdateWithoutAffectationsInput>
  }

  export type MissionAssignmentCreateNestedManyWithoutMissionInput = {
    create?: XOR<MissionAssignmentCreateWithoutMissionInput, MissionAssignmentUncheckedCreateWithoutMissionInput> | MissionAssignmentCreateWithoutMissionInput[] | MissionAssignmentUncheckedCreateWithoutMissionInput[]
    connectOrCreate?: MissionAssignmentCreateOrConnectWithoutMissionInput | MissionAssignmentCreateOrConnectWithoutMissionInput[]
    createMany?: MissionAssignmentCreateManyMissionInputEnvelope
    connect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
  }

  export type MissionAssignmentUncheckedCreateNestedManyWithoutMissionInput = {
    create?: XOR<MissionAssignmentCreateWithoutMissionInput, MissionAssignmentUncheckedCreateWithoutMissionInput> | MissionAssignmentCreateWithoutMissionInput[] | MissionAssignmentUncheckedCreateWithoutMissionInput[]
    connectOrCreate?: MissionAssignmentCreateOrConnectWithoutMissionInput | MissionAssignmentCreateOrConnectWithoutMissionInput[]
    createMany?: MissionAssignmentCreateManyMissionInputEnvelope
    connect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
  }

  export type EnumMissionPriorityFieldUpdateOperationsInput = {
    set?: $Enums.MissionPriority
  }

  export type EnumMissionStatusFieldUpdateOperationsInput = {
    set?: $Enums.MissionStatus
  }

  export type MissionAssignmentUpdateManyWithoutMissionNestedInput = {
    create?: XOR<MissionAssignmentCreateWithoutMissionInput, MissionAssignmentUncheckedCreateWithoutMissionInput> | MissionAssignmentCreateWithoutMissionInput[] | MissionAssignmentUncheckedCreateWithoutMissionInput[]
    connectOrCreate?: MissionAssignmentCreateOrConnectWithoutMissionInput | MissionAssignmentCreateOrConnectWithoutMissionInput[]
    upsert?: MissionAssignmentUpsertWithWhereUniqueWithoutMissionInput | MissionAssignmentUpsertWithWhereUniqueWithoutMissionInput[]
    createMany?: MissionAssignmentCreateManyMissionInputEnvelope
    set?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    disconnect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    delete?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    connect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    update?: MissionAssignmentUpdateWithWhereUniqueWithoutMissionInput | MissionAssignmentUpdateWithWhereUniqueWithoutMissionInput[]
    updateMany?: MissionAssignmentUpdateManyWithWhereWithoutMissionInput | MissionAssignmentUpdateManyWithWhereWithoutMissionInput[]
    deleteMany?: MissionAssignmentScalarWhereInput | MissionAssignmentScalarWhereInput[]
  }

  export type MissionAssignmentUncheckedUpdateManyWithoutMissionNestedInput = {
    create?: XOR<MissionAssignmentCreateWithoutMissionInput, MissionAssignmentUncheckedCreateWithoutMissionInput> | MissionAssignmentCreateWithoutMissionInput[] | MissionAssignmentUncheckedCreateWithoutMissionInput[]
    connectOrCreate?: MissionAssignmentCreateOrConnectWithoutMissionInput | MissionAssignmentCreateOrConnectWithoutMissionInput[]
    upsert?: MissionAssignmentUpsertWithWhereUniqueWithoutMissionInput | MissionAssignmentUpsertWithWhereUniqueWithoutMissionInput[]
    createMany?: MissionAssignmentCreateManyMissionInputEnvelope
    set?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    disconnect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    delete?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    connect?: MissionAssignmentWhereUniqueInput | MissionAssignmentWhereUniqueInput[]
    update?: MissionAssignmentUpdateWithWhereUniqueWithoutMissionInput | MissionAssignmentUpdateWithWhereUniqueWithoutMissionInput[]
    updateMany?: MissionAssignmentUpdateManyWithWhereWithoutMissionInput | MissionAssignmentUpdateManyWithWhereWithoutMissionInput[]
    deleteMany?: MissionAssignmentScalarWhereInput | MissionAssignmentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMissionAssignmentsInput = {
    create?: XOR<UserCreateWithoutMissionAssignmentsInput, UserUncheckedCreateWithoutMissionAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMissionAssignmentsInput
    connect?: UserWhereUniqueInput
  }

  export type MissionCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<MissionCreateWithoutAssignmentsInput, MissionUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: MissionCreateOrConnectWithoutAssignmentsInput
    connect?: MissionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMissionAssignmentsNestedInput = {
    create?: XOR<UserCreateWithoutMissionAssignmentsInput, UserUncheckedCreateWithoutMissionAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMissionAssignmentsInput
    upsert?: UserUpsertWithoutMissionAssignmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMissionAssignmentsInput, UserUpdateWithoutMissionAssignmentsInput>, UserUncheckedUpdateWithoutMissionAssignmentsInput>
  }

  export type MissionUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<MissionCreateWithoutAssignmentsInput, MissionUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: MissionCreateOrConnectWithoutAssignmentsInput
    upsert?: MissionUpsertWithoutAssignmentsInput
    connect?: MissionWhereUniqueInput
    update?: XOR<XOR<MissionUpdateToOneWithWhereWithoutAssignmentsInput, MissionUpdateWithoutAssignmentsInput>, MissionUncheckedUpdateWithoutAssignmentsInput>
  }

  export type EnumEventCategoryFieldUpdateOperationsInput = {
    set?: $Enums.EventCategory
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumAffectationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AffectationStatus | EnumAffectationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AffectationStatus[] | ListEnumAffectationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AffectationStatus[] | ListEnumAffectationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAffectationStatusFilter<$PrismaModel> | $Enums.AffectationStatus
  }

  export type NestedEnumAffectationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AffectationStatus | EnumAffectationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AffectationStatus[] | ListEnumAffectationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AffectationStatus[] | ListEnumAffectationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAffectationStatusWithAggregatesFilter<$PrismaModel> | $Enums.AffectationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAffectationStatusFilter<$PrismaModel>
    _max?: NestedEnumAffectationStatusFilter<$PrismaModel>
  }

  export type NestedEnumMissionPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.MissionPriority | EnumMissionPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.MissionPriority[] | ListEnumMissionPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.MissionPriority[] | ListEnumMissionPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumMissionPriorityFilter<$PrismaModel> | $Enums.MissionPriority
  }

  export type NestedEnumMissionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MissionStatus | EnumMissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MissionStatus[] | ListEnumMissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MissionStatus[] | ListEnumMissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMissionStatusFilter<$PrismaModel> | $Enums.MissionStatus
  }

  export type NestedEnumMissionPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MissionPriority | EnumMissionPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.MissionPriority[] | ListEnumMissionPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.MissionPriority[] | ListEnumMissionPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumMissionPriorityWithAggregatesFilter<$PrismaModel> | $Enums.MissionPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMissionPriorityFilter<$PrismaModel>
    _max?: NestedEnumMissionPriorityFilter<$PrismaModel>
  }

  export type NestedEnumMissionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MissionStatus | EnumMissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MissionStatus[] | ListEnumMissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MissionStatus[] | ListEnumMissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMissionStatusWithAggregatesFilter<$PrismaModel> | $Enums.MissionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMissionStatusFilter<$PrismaModel>
    _max?: NestedEnumMissionStatusFilter<$PrismaModel>
  }

  export type NestedEnumEventCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.EventCategory | EnumEventCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumEventCategoryFilter<$PrismaModel> | $Enums.EventCategory
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumEventCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventCategory | EnumEventCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumEventCategoryWithAggregatesFilter<$PrismaModel> | $Enums.EventCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventCategoryFilter<$PrismaModel>
    _max?: NestedEnumEventCategoryFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AffectationCreateWithoutVolunteerInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    timeslot: TimeslotCreateNestedOneWithoutAffectationsInput
    sector: SectorCreateNestedOneWithoutAffectationsInput
  }

  export type AffectationUncheckedCreateWithoutVolunteerInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    timeslotId: string
    sectorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffectationCreateOrConnectWithoutVolunteerInput = {
    where: AffectationWhereUniqueInput
    create: XOR<AffectationCreateWithoutVolunteerInput, AffectationUncheckedCreateWithoutVolunteerInput>
  }

  export type AffectationCreateManyVolunteerInputEnvelope = {
    data: AffectationCreateManyVolunteerInput | AffectationCreateManyVolunteerInput[]
    skipDuplicates?: boolean
  }

  export type MissionAssignmentCreateWithoutUserInput = {
    id?: string
    mission: MissionCreateNestedOneWithoutAssignmentsInput
  }

  export type MissionAssignmentUncheckedCreateWithoutUserInput = {
    id?: string
    missionId: string
  }

  export type MissionAssignmentCreateOrConnectWithoutUserInput = {
    where: MissionAssignmentWhereUniqueInput
    create: XOR<MissionAssignmentCreateWithoutUserInput, MissionAssignmentUncheckedCreateWithoutUserInput>
  }

  export type MissionAssignmentCreateManyUserInputEnvelope = {
    data: MissionAssignmentCreateManyUserInput | MissionAssignmentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SectorReferentCreateWithoutUserInput = {
    id?: string
    sector: SectorCreateNestedOneWithoutReferentsInput
  }

  export type SectorReferentUncheckedCreateWithoutUserInput = {
    id?: string
    sectorId: string
  }

  export type SectorReferentCreateOrConnectWithoutUserInput = {
    where: SectorReferentWhereUniqueInput
    create: XOR<SectorReferentCreateWithoutUserInput, SectorReferentUncheckedCreateWithoutUserInput>
  }

  export type SectorReferentCreateManyUserInputEnvelope = {
    data: SectorReferentCreateManyUserInput | SectorReferentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AffectationUpsertWithWhereUniqueWithoutVolunteerInput = {
    where: AffectationWhereUniqueInput
    update: XOR<AffectationUpdateWithoutVolunteerInput, AffectationUncheckedUpdateWithoutVolunteerInput>
    create: XOR<AffectationCreateWithoutVolunteerInput, AffectationUncheckedCreateWithoutVolunteerInput>
  }

  export type AffectationUpdateWithWhereUniqueWithoutVolunteerInput = {
    where: AffectationWhereUniqueInput
    data: XOR<AffectationUpdateWithoutVolunteerInput, AffectationUncheckedUpdateWithoutVolunteerInput>
  }

  export type AffectationUpdateManyWithWhereWithoutVolunteerInput = {
    where: AffectationScalarWhereInput
    data: XOR<AffectationUpdateManyMutationInput, AffectationUncheckedUpdateManyWithoutVolunteerInput>
  }

  export type AffectationScalarWhereInput = {
    AND?: AffectationScalarWhereInput | AffectationScalarWhereInput[]
    OR?: AffectationScalarWhereInput[]
    NOT?: AffectationScalarWhereInput | AffectationScalarWhereInput[]
    id?: StringFilter<"Affectation"> | string
    number?: IntFilter<"Affectation"> | number
    status?: EnumAffectationStatusFilter<"Affectation"> | $Enums.AffectationStatus
    volunteerId?: StringFilter<"Affectation"> | string
    timeslotId?: StringFilter<"Affectation"> | string
    sectorId?: StringFilter<"Affectation"> | string
    createdAt?: DateTimeFilter<"Affectation"> | Date | string
    updatedAt?: DateTimeFilter<"Affectation"> | Date | string
  }

  export type MissionAssignmentUpsertWithWhereUniqueWithoutUserInput = {
    where: MissionAssignmentWhereUniqueInput
    update: XOR<MissionAssignmentUpdateWithoutUserInput, MissionAssignmentUncheckedUpdateWithoutUserInput>
    create: XOR<MissionAssignmentCreateWithoutUserInput, MissionAssignmentUncheckedCreateWithoutUserInput>
  }

  export type MissionAssignmentUpdateWithWhereUniqueWithoutUserInput = {
    where: MissionAssignmentWhereUniqueInput
    data: XOR<MissionAssignmentUpdateWithoutUserInput, MissionAssignmentUncheckedUpdateWithoutUserInput>
  }

  export type MissionAssignmentUpdateManyWithWhereWithoutUserInput = {
    where: MissionAssignmentScalarWhereInput
    data: XOR<MissionAssignmentUpdateManyMutationInput, MissionAssignmentUncheckedUpdateManyWithoutUserInput>
  }

  export type MissionAssignmentScalarWhereInput = {
    AND?: MissionAssignmentScalarWhereInput | MissionAssignmentScalarWhereInput[]
    OR?: MissionAssignmentScalarWhereInput[]
    NOT?: MissionAssignmentScalarWhereInput | MissionAssignmentScalarWhereInput[]
    id?: StringFilter<"MissionAssignment"> | string
    userId?: StringFilter<"MissionAssignment"> | string
    missionId?: StringFilter<"MissionAssignment"> | string
  }

  export type SectorReferentUpsertWithWhereUniqueWithoutUserInput = {
    where: SectorReferentWhereUniqueInput
    update: XOR<SectorReferentUpdateWithoutUserInput, SectorReferentUncheckedUpdateWithoutUserInput>
    create: XOR<SectorReferentCreateWithoutUserInput, SectorReferentUncheckedCreateWithoutUserInput>
  }

  export type SectorReferentUpdateWithWhereUniqueWithoutUserInput = {
    where: SectorReferentWhereUniqueInput
    data: XOR<SectorReferentUpdateWithoutUserInput, SectorReferentUncheckedUpdateWithoutUserInput>
  }

  export type SectorReferentUpdateManyWithWhereWithoutUserInput = {
    where: SectorReferentScalarWhereInput
    data: XOR<SectorReferentUpdateManyMutationInput, SectorReferentUncheckedUpdateManyWithoutUserInput>
  }

  export type SectorReferentScalarWhereInput = {
    AND?: SectorReferentScalarWhereInput | SectorReferentScalarWhereInput[]
    OR?: SectorReferentScalarWhereInput[]
    NOT?: SectorReferentScalarWhereInput | SectorReferentScalarWhereInput[]
    id?: StringFilter<"SectorReferent"> | string
    userId?: StringFilter<"SectorReferent"> | string
    sectorId?: StringFilter<"SectorReferent"> | string
  }

  export type TimeslotCreateWithoutSectorInput = {
    id?: string
    name: string
    dateStart?: Date | string | null
    dateEnd?: Date | string | null
    totalVolunteers?: number
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationCreateNestedManyWithoutTimeslotInput
  }

  export type TimeslotUncheckedCreateWithoutSectorInput = {
    id?: string
    name: string
    dateStart?: Date | string | null
    dateEnd?: Date | string | null
    totalVolunteers?: number
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationUncheckedCreateNestedManyWithoutTimeslotInput
  }

  export type TimeslotCreateOrConnectWithoutSectorInput = {
    where: TimeslotWhereUniqueInput
    create: XOR<TimeslotCreateWithoutSectorInput, TimeslotUncheckedCreateWithoutSectorInput>
  }

  export type TimeslotCreateManySectorInputEnvelope = {
    data: TimeslotCreateManySectorInput | TimeslotCreateManySectorInput[]
    skipDuplicates?: boolean
  }

  export type AffectationCreateWithoutSectorInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    volunteer: UserCreateNestedOneWithoutAffectationsInput
    timeslot: TimeslotCreateNestedOneWithoutAffectationsInput
  }

  export type AffectationUncheckedCreateWithoutSectorInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    volunteerId: string
    timeslotId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffectationCreateOrConnectWithoutSectorInput = {
    where: AffectationWhereUniqueInput
    create: XOR<AffectationCreateWithoutSectorInput, AffectationUncheckedCreateWithoutSectorInput>
  }

  export type AffectationCreateManySectorInputEnvelope = {
    data: AffectationCreateManySectorInput | AffectationCreateManySectorInput[]
    skipDuplicates?: boolean
  }

  export type SectorReferentCreateWithoutSectorInput = {
    id?: string
    user: UserCreateNestedOneWithoutReferentSectorsInput
  }

  export type SectorReferentUncheckedCreateWithoutSectorInput = {
    id?: string
    userId: string
  }

  export type SectorReferentCreateOrConnectWithoutSectorInput = {
    where: SectorReferentWhereUniqueInput
    create: XOR<SectorReferentCreateWithoutSectorInput, SectorReferentUncheckedCreateWithoutSectorInput>
  }

  export type SectorReferentCreateManySectorInputEnvelope = {
    data: SectorReferentCreateManySectorInput | SectorReferentCreateManySectorInput[]
    skipDuplicates?: boolean
  }

  export type TimeslotUpsertWithWhereUniqueWithoutSectorInput = {
    where: TimeslotWhereUniqueInput
    update: XOR<TimeslotUpdateWithoutSectorInput, TimeslotUncheckedUpdateWithoutSectorInput>
    create: XOR<TimeslotCreateWithoutSectorInput, TimeslotUncheckedCreateWithoutSectorInput>
  }

  export type TimeslotUpdateWithWhereUniqueWithoutSectorInput = {
    where: TimeslotWhereUniqueInput
    data: XOR<TimeslotUpdateWithoutSectorInput, TimeslotUncheckedUpdateWithoutSectorInput>
  }

  export type TimeslotUpdateManyWithWhereWithoutSectorInput = {
    where: TimeslotScalarWhereInput
    data: XOR<TimeslotUpdateManyMutationInput, TimeslotUncheckedUpdateManyWithoutSectorInput>
  }

  export type TimeslotScalarWhereInput = {
    AND?: TimeslotScalarWhereInput | TimeslotScalarWhereInput[]
    OR?: TimeslotScalarWhereInput[]
    NOT?: TimeslotScalarWhereInput | TimeslotScalarWhereInput[]
    id?: StringFilter<"Timeslot"> | string
    name?: StringFilter<"Timeslot"> | string
    dateStart?: DateTimeNullableFilter<"Timeslot"> | Date | string | null
    dateEnd?: DateTimeNullableFilter<"Timeslot"> | Date | string | null
    totalVolunteers?: IntFilter<"Timeslot"> | number
    details?: StringNullableFilter<"Timeslot"> | string | null
    sectorId?: StringFilter<"Timeslot"> | string
    createdAt?: DateTimeFilter<"Timeslot"> | Date | string
    updatedAt?: DateTimeFilter<"Timeslot"> | Date | string
  }

  export type AffectationUpsertWithWhereUniqueWithoutSectorInput = {
    where: AffectationWhereUniqueInput
    update: XOR<AffectationUpdateWithoutSectorInput, AffectationUncheckedUpdateWithoutSectorInput>
    create: XOR<AffectationCreateWithoutSectorInput, AffectationUncheckedCreateWithoutSectorInput>
  }

  export type AffectationUpdateWithWhereUniqueWithoutSectorInput = {
    where: AffectationWhereUniqueInput
    data: XOR<AffectationUpdateWithoutSectorInput, AffectationUncheckedUpdateWithoutSectorInput>
  }

  export type AffectationUpdateManyWithWhereWithoutSectorInput = {
    where: AffectationScalarWhereInput
    data: XOR<AffectationUpdateManyMutationInput, AffectationUncheckedUpdateManyWithoutSectorInput>
  }

  export type SectorReferentUpsertWithWhereUniqueWithoutSectorInput = {
    where: SectorReferentWhereUniqueInput
    update: XOR<SectorReferentUpdateWithoutSectorInput, SectorReferentUncheckedUpdateWithoutSectorInput>
    create: XOR<SectorReferentCreateWithoutSectorInput, SectorReferentUncheckedCreateWithoutSectorInput>
  }

  export type SectorReferentUpdateWithWhereUniqueWithoutSectorInput = {
    where: SectorReferentWhereUniqueInput
    data: XOR<SectorReferentUpdateWithoutSectorInput, SectorReferentUncheckedUpdateWithoutSectorInput>
  }

  export type SectorReferentUpdateManyWithWhereWithoutSectorInput = {
    where: SectorReferentScalarWhereInput
    data: XOR<SectorReferentUpdateManyMutationInput, SectorReferentUncheckedUpdateManyWithoutSectorInput>
  }

  export type UserCreateWithoutReferentSectorsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    firstname?: string | null
    surname?: string | null
    phone?: string | null
    role?: $Enums.Role
    isReferent?: boolean
    isActive?: boolean
    status?: string | null
    avatar?: string | null
    notes?: string | null
    skills?: UserCreateskillsInput | string[]
    availability?: UserCreateavailabilityInput | string[]
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastLoginIp?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationCreateNestedManyWithoutVolunteerInput
    missionAssignments?: MissionAssignmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReferentSectorsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    firstname?: string | null
    surname?: string | null
    phone?: string | null
    role?: $Enums.Role
    isReferent?: boolean
    isActive?: boolean
    status?: string | null
    avatar?: string | null
    notes?: string | null
    skills?: UserCreateskillsInput | string[]
    availability?: UserCreateavailabilityInput | string[]
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastLoginIp?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationUncheckedCreateNestedManyWithoutVolunteerInput
    missionAssignments?: MissionAssignmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReferentSectorsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReferentSectorsInput, UserUncheckedCreateWithoutReferentSectorsInput>
  }

  export type SectorCreateWithoutReferentsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    status?: string | null
    skills?: SectorCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    timeslots?: TimeslotCreateNestedManyWithoutSectorInput
    affectations?: AffectationCreateNestedManyWithoutSectorInput
  }

  export type SectorUncheckedCreateWithoutReferentsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    status?: string | null
    skills?: SectorCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    timeslots?: TimeslotUncheckedCreateNestedManyWithoutSectorInput
    affectations?: AffectationUncheckedCreateNestedManyWithoutSectorInput
  }

  export type SectorCreateOrConnectWithoutReferentsInput = {
    where: SectorWhereUniqueInput
    create: XOR<SectorCreateWithoutReferentsInput, SectorUncheckedCreateWithoutReferentsInput>
  }

  export type UserUpsertWithoutReferentSectorsInput = {
    update: XOR<UserUpdateWithoutReferentSectorsInput, UserUncheckedUpdateWithoutReferentSectorsInput>
    create: XOR<UserCreateWithoutReferentSectorsInput, UserUncheckedCreateWithoutReferentSectorsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReferentSectorsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReferentSectorsInput, UserUncheckedUpdateWithoutReferentSectorsInput>
  }

  export type UserUpdateWithoutReferentSectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUpdateManyWithoutVolunteerNestedInput
    missionAssignments?: MissionAssignmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReferentSectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUncheckedUpdateManyWithoutVolunteerNestedInput
    missionAssignments?: MissionAssignmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SectorUpsertWithoutReferentsInput = {
    update: XOR<SectorUpdateWithoutReferentsInput, SectorUncheckedUpdateWithoutReferentsInput>
    create: XOR<SectorCreateWithoutReferentsInput, SectorUncheckedCreateWithoutReferentsInput>
    where?: SectorWhereInput
  }

  export type SectorUpdateToOneWithWhereWithoutReferentsInput = {
    where?: SectorWhereInput
    data: XOR<SectorUpdateWithoutReferentsInput, SectorUncheckedUpdateWithoutReferentsInput>
  }

  export type SectorUpdateWithoutReferentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeslots?: TimeslotUpdateManyWithoutSectorNestedInput
    affectations?: AffectationUpdateManyWithoutSectorNestedInput
  }

  export type SectorUncheckedUpdateWithoutReferentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeslots?: TimeslotUncheckedUpdateManyWithoutSectorNestedInput
    affectations?: AffectationUncheckedUpdateManyWithoutSectorNestedInput
  }

  export type SectorCreateWithoutTimeslotsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    status?: string | null
    skills?: SectorCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationCreateNestedManyWithoutSectorInput
    referents?: SectorReferentCreateNestedManyWithoutSectorInput
  }

  export type SectorUncheckedCreateWithoutTimeslotsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    status?: string | null
    skills?: SectorCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationUncheckedCreateNestedManyWithoutSectorInput
    referents?: SectorReferentUncheckedCreateNestedManyWithoutSectorInput
  }

  export type SectorCreateOrConnectWithoutTimeslotsInput = {
    where: SectorWhereUniqueInput
    create: XOR<SectorCreateWithoutTimeslotsInput, SectorUncheckedCreateWithoutTimeslotsInput>
  }

  export type AffectationCreateWithoutTimeslotInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    volunteer: UserCreateNestedOneWithoutAffectationsInput
    sector: SectorCreateNestedOneWithoutAffectationsInput
  }

  export type AffectationUncheckedCreateWithoutTimeslotInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    volunteerId: string
    sectorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffectationCreateOrConnectWithoutTimeslotInput = {
    where: AffectationWhereUniqueInput
    create: XOR<AffectationCreateWithoutTimeslotInput, AffectationUncheckedCreateWithoutTimeslotInput>
  }

  export type AffectationCreateManyTimeslotInputEnvelope = {
    data: AffectationCreateManyTimeslotInput | AffectationCreateManyTimeslotInput[]
    skipDuplicates?: boolean
  }

  export type SectorUpsertWithoutTimeslotsInput = {
    update: XOR<SectorUpdateWithoutTimeslotsInput, SectorUncheckedUpdateWithoutTimeslotsInput>
    create: XOR<SectorCreateWithoutTimeslotsInput, SectorUncheckedCreateWithoutTimeslotsInput>
    where?: SectorWhereInput
  }

  export type SectorUpdateToOneWithWhereWithoutTimeslotsInput = {
    where?: SectorWhereInput
    data: XOR<SectorUpdateWithoutTimeslotsInput, SectorUncheckedUpdateWithoutTimeslotsInput>
  }

  export type SectorUpdateWithoutTimeslotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUpdateManyWithoutSectorNestedInput
    referents?: SectorReferentUpdateManyWithoutSectorNestedInput
  }

  export type SectorUncheckedUpdateWithoutTimeslotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUncheckedUpdateManyWithoutSectorNestedInput
    referents?: SectorReferentUncheckedUpdateManyWithoutSectorNestedInput
  }

  export type AffectationUpsertWithWhereUniqueWithoutTimeslotInput = {
    where: AffectationWhereUniqueInput
    update: XOR<AffectationUpdateWithoutTimeslotInput, AffectationUncheckedUpdateWithoutTimeslotInput>
    create: XOR<AffectationCreateWithoutTimeslotInput, AffectationUncheckedCreateWithoutTimeslotInput>
  }

  export type AffectationUpdateWithWhereUniqueWithoutTimeslotInput = {
    where: AffectationWhereUniqueInput
    data: XOR<AffectationUpdateWithoutTimeslotInput, AffectationUncheckedUpdateWithoutTimeslotInput>
  }

  export type AffectationUpdateManyWithWhereWithoutTimeslotInput = {
    where: AffectationScalarWhereInput
    data: XOR<AffectationUpdateManyMutationInput, AffectationUncheckedUpdateManyWithoutTimeslotInput>
  }

  export type UserCreateWithoutAffectationsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    firstname?: string | null
    surname?: string | null
    phone?: string | null
    role?: $Enums.Role
    isReferent?: boolean
    isActive?: boolean
    status?: string | null
    avatar?: string | null
    notes?: string | null
    skills?: UserCreateskillsInput | string[]
    availability?: UserCreateavailabilityInput | string[]
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastLoginIp?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    missionAssignments?: MissionAssignmentCreateNestedManyWithoutUserInput
    referentSectors?: SectorReferentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAffectationsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    firstname?: string | null
    surname?: string | null
    phone?: string | null
    role?: $Enums.Role
    isReferent?: boolean
    isActive?: boolean
    status?: string | null
    avatar?: string | null
    notes?: string | null
    skills?: UserCreateskillsInput | string[]
    availability?: UserCreateavailabilityInput | string[]
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastLoginIp?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    missionAssignments?: MissionAssignmentUncheckedCreateNestedManyWithoutUserInput
    referentSectors?: SectorReferentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAffectationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAffectationsInput, UserUncheckedCreateWithoutAffectationsInput>
  }

  export type TimeslotCreateWithoutAffectationsInput = {
    id?: string
    name: string
    dateStart?: Date | string | null
    dateEnd?: Date | string | null
    totalVolunteers?: number
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sector: SectorCreateNestedOneWithoutTimeslotsInput
  }

  export type TimeslotUncheckedCreateWithoutAffectationsInput = {
    id?: string
    name: string
    dateStart?: Date | string | null
    dateEnd?: Date | string | null
    totalVolunteers?: number
    details?: string | null
    sectorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimeslotCreateOrConnectWithoutAffectationsInput = {
    where: TimeslotWhereUniqueInput
    create: XOR<TimeslotCreateWithoutAffectationsInput, TimeslotUncheckedCreateWithoutAffectationsInput>
  }

  export type SectorCreateWithoutAffectationsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    status?: string | null
    skills?: SectorCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    timeslots?: TimeslotCreateNestedManyWithoutSectorInput
    referents?: SectorReferentCreateNestedManyWithoutSectorInput
  }

  export type SectorUncheckedCreateWithoutAffectationsInput = {
    id?: string
    name: string
    description?: string | null
    color?: string | null
    status?: string | null
    skills?: SectorCreateskillsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    timeslots?: TimeslotUncheckedCreateNestedManyWithoutSectorInput
    referents?: SectorReferentUncheckedCreateNestedManyWithoutSectorInput
  }

  export type SectorCreateOrConnectWithoutAffectationsInput = {
    where: SectorWhereUniqueInput
    create: XOR<SectorCreateWithoutAffectationsInput, SectorUncheckedCreateWithoutAffectationsInput>
  }

  export type UserUpsertWithoutAffectationsInput = {
    update: XOR<UserUpdateWithoutAffectationsInput, UserUncheckedUpdateWithoutAffectationsInput>
    create: XOR<UserCreateWithoutAffectationsInput, UserUncheckedCreateWithoutAffectationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAffectationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAffectationsInput, UserUncheckedUpdateWithoutAffectationsInput>
  }

  export type UserUpdateWithoutAffectationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    missionAssignments?: MissionAssignmentUpdateManyWithoutUserNestedInput
    referentSectors?: SectorReferentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAffectationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    missionAssignments?: MissionAssignmentUncheckedUpdateManyWithoutUserNestedInput
    referentSectors?: SectorReferentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TimeslotUpsertWithoutAffectationsInput = {
    update: XOR<TimeslotUpdateWithoutAffectationsInput, TimeslotUncheckedUpdateWithoutAffectationsInput>
    create: XOR<TimeslotCreateWithoutAffectationsInput, TimeslotUncheckedCreateWithoutAffectationsInput>
    where?: TimeslotWhereInput
  }

  export type TimeslotUpdateToOneWithWhereWithoutAffectationsInput = {
    where?: TimeslotWhereInput
    data: XOR<TimeslotUpdateWithoutAffectationsInput, TimeslotUncheckedUpdateWithoutAffectationsInput>
  }

  export type TimeslotUpdateWithoutAffectationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVolunteers?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sector?: SectorUpdateOneRequiredWithoutTimeslotsNestedInput
  }

  export type TimeslotUncheckedUpdateWithoutAffectationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVolunteers?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    sectorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectorUpsertWithoutAffectationsInput = {
    update: XOR<SectorUpdateWithoutAffectationsInput, SectorUncheckedUpdateWithoutAffectationsInput>
    create: XOR<SectorCreateWithoutAffectationsInput, SectorUncheckedCreateWithoutAffectationsInput>
    where?: SectorWhereInput
  }

  export type SectorUpdateToOneWithWhereWithoutAffectationsInput = {
    where?: SectorWhereInput
    data: XOR<SectorUpdateWithoutAffectationsInput, SectorUncheckedUpdateWithoutAffectationsInput>
  }

  export type SectorUpdateWithoutAffectationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeslots?: TimeslotUpdateManyWithoutSectorNestedInput
    referents?: SectorReferentUpdateManyWithoutSectorNestedInput
  }

  export type SectorUncheckedUpdateWithoutAffectationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: SectorUpdateskillsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeslots?: TimeslotUncheckedUpdateManyWithoutSectorNestedInput
    referents?: SectorReferentUncheckedUpdateManyWithoutSectorNestedInput
  }

  export type MissionAssignmentCreateWithoutMissionInput = {
    id?: string
    user: UserCreateNestedOneWithoutMissionAssignmentsInput
  }

  export type MissionAssignmentUncheckedCreateWithoutMissionInput = {
    id?: string
    userId: string
  }

  export type MissionAssignmentCreateOrConnectWithoutMissionInput = {
    where: MissionAssignmentWhereUniqueInput
    create: XOR<MissionAssignmentCreateWithoutMissionInput, MissionAssignmentUncheckedCreateWithoutMissionInput>
  }

  export type MissionAssignmentCreateManyMissionInputEnvelope = {
    data: MissionAssignmentCreateManyMissionInput | MissionAssignmentCreateManyMissionInput[]
    skipDuplicates?: boolean
  }

  export type MissionAssignmentUpsertWithWhereUniqueWithoutMissionInput = {
    where: MissionAssignmentWhereUniqueInput
    update: XOR<MissionAssignmentUpdateWithoutMissionInput, MissionAssignmentUncheckedUpdateWithoutMissionInput>
    create: XOR<MissionAssignmentCreateWithoutMissionInput, MissionAssignmentUncheckedCreateWithoutMissionInput>
  }

  export type MissionAssignmentUpdateWithWhereUniqueWithoutMissionInput = {
    where: MissionAssignmentWhereUniqueInput
    data: XOR<MissionAssignmentUpdateWithoutMissionInput, MissionAssignmentUncheckedUpdateWithoutMissionInput>
  }

  export type MissionAssignmentUpdateManyWithWhereWithoutMissionInput = {
    where: MissionAssignmentScalarWhereInput
    data: XOR<MissionAssignmentUpdateManyMutationInput, MissionAssignmentUncheckedUpdateManyWithoutMissionInput>
  }

  export type UserCreateWithoutMissionAssignmentsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    firstname?: string | null
    surname?: string | null
    phone?: string | null
    role?: $Enums.Role
    isReferent?: boolean
    isActive?: boolean
    status?: string | null
    avatar?: string | null
    notes?: string | null
    skills?: UserCreateskillsInput | string[]
    availability?: UserCreateavailabilityInput | string[]
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastLoginIp?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationCreateNestedManyWithoutVolunteerInput
    referentSectors?: SectorReferentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMissionAssignmentsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    firstname?: string | null
    surname?: string | null
    phone?: string | null
    role?: $Enums.Role
    isReferent?: boolean
    isActive?: boolean
    status?: string | null
    avatar?: string | null
    notes?: string | null
    skills?: UserCreateskillsInput | string[]
    availability?: UserCreateavailabilityInput | string[]
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    lastLoginAt?: Date | string | null
    lastLoginIp?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    affectations?: AffectationUncheckedCreateNestedManyWithoutVolunteerInput
    referentSectors?: SectorReferentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMissionAssignmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMissionAssignmentsInput, UserUncheckedCreateWithoutMissionAssignmentsInput>
  }

  export type MissionCreateWithoutAssignmentsInput = {
    id?: string
    name: string
    description?: string | null
    dateStart: Date | string
    dateEnd: Date | string
    place?: string | null
    priority?: $Enums.MissionPriority
    status?: $Enums.MissionStatus
    humanResources?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MissionUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    name: string
    description?: string | null
    dateStart: Date | string
    dateEnd: Date | string
    place?: string | null
    priority?: $Enums.MissionPriority
    status?: $Enums.MissionStatus
    humanResources?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MissionCreateOrConnectWithoutAssignmentsInput = {
    where: MissionWhereUniqueInput
    create: XOR<MissionCreateWithoutAssignmentsInput, MissionUncheckedCreateWithoutAssignmentsInput>
  }

  export type UserUpsertWithoutMissionAssignmentsInput = {
    update: XOR<UserUpdateWithoutMissionAssignmentsInput, UserUncheckedUpdateWithoutMissionAssignmentsInput>
    create: XOR<UserCreateWithoutMissionAssignmentsInput, UserUncheckedCreateWithoutMissionAssignmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMissionAssignmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMissionAssignmentsInput, UserUncheckedUpdateWithoutMissionAssignmentsInput>
  }

  export type UserUpdateWithoutMissionAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUpdateManyWithoutVolunteerNestedInput
    referentSectors?: SectorReferentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMissionAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isReferent?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    status?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: UserUpdateskillsInput | string[]
    availability?: UserUpdateavailabilityInput | string[]
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIp?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUncheckedUpdateManyWithoutVolunteerNestedInput
    referentSectors?: SectorReferentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MissionUpsertWithoutAssignmentsInput = {
    update: XOR<MissionUpdateWithoutAssignmentsInput, MissionUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<MissionCreateWithoutAssignmentsInput, MissionUncheckedCreateWithoutAssignmentsInput>
    where?: MissionWhereInput
  }

  export type MissionUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: MissionWhereInput
    data: XOR<MissionUpdateWithoutAssignmentsInput, MissionUncheckedUpdateWithoutAssignmentsInput>
  }

  export type MissionUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumMissionPriorityFieldUpdateOperationsInput | $Enums.MissionPriority
    status?: EnumMissionStatusFieldUpdateOperationsInput | $Enums.MissionStatus
    humanResources?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumMissionPriorityFieldUpdateOperationsInput | $Enums.MissionPriority
    status?: EnumMissionStatusFieldUpdateOperationsInput | $Enums.MissionStatus
    humanResources?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffectationCreateManyVolunteerInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    timeslotId: string
    sectorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MissionAssignmentCreateManyUserInput = {
    id?: string
    missionId: string
  }

  export type SectorReferentCreateManyUserInput = {
    id?: string
    sectorId: string
  }

  export type AffectationUpdateWithoutVolunteerInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeslot?: TimeslotUpdateOneRequiredWithoutAffectationsNestedInput
    sector?: SectorUpdateOneRequiredWithoutAffectationsNestedInput
  }

  export type AffectationUncheckedUpdateWithoutVolunteerInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    timeslotId?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffectationUncheckedUpdateManyWithoutVolunteerInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    timeslotId?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionAssignmentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mission?: MissionUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type MissionAssignmentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    missionId?: StringFieldUpdateOperationsInput | string
  }

  export type MissionAssignmentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    missionId?: StringFieldUpdateOperationsInput | string
  }

  export type SectorReferentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sector?: SectorUpdateOneRequiredWithoutReferentsNestedInput
  }

  export type SectorReferentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
  }

  export type SectorReferentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
  }

  export type TimeslotCreateManySectorInput = {
    id?: string
    name: string
    dateStart?: Date | string | null
    dateEnd?: Date | string | null
    totalVolunteers?: number
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffectationCreateManySectorInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    volunteerId: string
    timeslotId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectorReferentCreateManySectorInput = {
    id?: string
    userId: string
  }

  export type TimeslotUpdateWithoutSectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVolunteers?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUpdateManyWithoutTimeslotNestedInput
  }

  export type TimeslotUncheckedUpdateWithoutSectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVolunteers?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affectations?: AffectationUncheckedUpdateManyWithoutTimeslotNestedInput
  }

  export type TimeslotUncheckedUpdateManyWithoutSectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalVolunteers?: IntFieldUpdateOperationsInput | number
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffectationUpdateWithoutSectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteer?: UserUpdateOneRequiredWithoutAffectationsNestedInput
    timeslot?: TimeslotUpdateOneRequiredWithoutAffectationsNestedInput
  }

  export type AffectationUncheckedUpdateWithoutSectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    volunteerId?: StringFieldUpdateOperationsInput | string
    timeslotId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffectationUncheckedUpdateManyWithoutSectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    volunteerId?: StringFieldUpdateOperationsInput | string
    timeslotId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectorReferentUpdateWithoutSectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutReferentSectorsNestedInput
  }

  export type SectorReferentUncheckedUpdateWithoutSectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SectorReferentUncheckedUpdateManyWithoutSectorInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AffectationCreateManyTimeslotInput = {
    id?: string
    number?: number
    status?: $Enums.AffectationStatus
    volunteerId: string
    sectorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffectationUpdateWithoutTimeslotInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteer?: UserUpdateOneRequiredWithoutAffectationsNestedInput
    sector?: SectorUpdateOneRequiredWithoutAffectationsNestedInput
  }

  export type AffectationUncheckedUpdateWithoutTimeslotInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    volunteerId?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffectationUncheckedUpdateManyWithoutTimeslotInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    status?: EnumAffectationStatusFieldUpdateOperationsInput | $Enums.AffectationStatus
    volunteerId?: StringFieldUpdateOperationsInput | string
    sectorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionAssignmentCreateManyMissionInput = {
    id?: string
    userId: string
  }

  export type MissionAssignmentUpdateWithoutMissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutMissionAssignmentsNestedInput
  }

  export type MissionAssignmentUncheckedUpdateWithoutMissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MissionAssignmentUncheckedUpdateManyWithoutMissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}