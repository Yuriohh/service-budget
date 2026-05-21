export declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ResetPassword: { token: string };
};

export type RootStackParamList = {
  Home: undefined;
  BudgetForm: { id?: string } | undefined;
  BudgetDetails: { id?: string } | undefined;
  Profile: undefined;
  ResetPassword: { token: string };
};
