import { InstitutionModel } from './models/Institution';
import { IccUserModel } from './models/IccUser';
import { IncidentReportModel } from './models/IncidentReport';
import { INSTITUTIONS, DEMO_ICC_ACCOUNTS } from '../store';

export async function seedInitialDatabaseIfEmpty() {
  try {
    // 1. Clean up any legacy test or mock demo cases
    await IncidentReportModel.deleteMany({
      caseNumber: { $in: ['R-2841', 'R-021', 'R-087', 'R-143'] },
    });
    for (const inst of INSTITUTIONS) {
      await InstitutionModel.findOneAndUpdate(
        { institutionId: inst.id },
        {
          institutionId: inst.id,
          name: inst.name,
          shortCode: inst.shortCode,
          domain: inst.domain,
          type: inst.type,
          active: true,
        },
        { upsert: true, new: true }
      );
    }
    console.log(`[MongoDB] Verified ${INSTITUTIONS.length} institutions in database.`);

    // 2. Seed or Upsert ICC Users
    for (const acc of DEMO_ICC_ACCOUNTS) {
      await IccUserModel.findOneAndUpdate(
        { email: acc.email.toLowerCase().trim() },
        {
          userId: acc.id,
          email: acc.email.toLowerCase().trim(),
          name: acc.name,
          role: acc.role,
          institutionId: acc.institutionId,
          institutionName: acc.institutionName,
          active: acc.active,
        },
        { upsert: true, new: true }
      );
    }
    console.log(`[MongoDB] Verified ${DEMO_ICC_ACCOUNTS.length} ICC officer accounts.`);

    // Note: No mock incident reports are seeded. Database begins with 0 cases.
  } catch (error) {
    console.error('[MongoDB Seed Error]', error);
  }
}
