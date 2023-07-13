export interface LogErrorRepository {
  // A classe concreta que ira implementar a interface precia que
  // o metodo da interface tambem tenha o seu nome concreto e nao abstrato/generico
  logError(stack: string): Promise<void>
}
