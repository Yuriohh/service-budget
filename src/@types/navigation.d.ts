export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  BudgetForm: { id?: string } | undefined;
  BudgetDetails: { id?: string } | undefined;
};
