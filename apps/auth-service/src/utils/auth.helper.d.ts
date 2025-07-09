import { NextFunction } from 'express';
export declare const ValidationRegistrationData: (data: any, userType: "user" | "seller") => void;
export declare const checkOtpRestrictions: (email: string, next: NextFunction) => Promise<void>;
export declare const trackOtpRequests: (email: string, next: NextFunction) => Promise<void>;
export declare const sendOtp: (name: string, email: string, template: string) => Promise<void>;
//# sourceMappingURL=auth.helper.d.ts.map