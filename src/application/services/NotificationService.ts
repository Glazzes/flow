export interface NotificationService<TypeOptions> {
  notify(): Promise<string>;
  updateNotification(id: string, options: TypeOptions): Promise<string>;
}
