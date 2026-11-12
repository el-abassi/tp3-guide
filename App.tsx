import { View, Text, StyleSheet, ScrollView } from 'react-native';

type Etudiant = {
  id: string;
  nom: string;
  filiere: string;
  note: number;
};

const etudiants: Etudiant[] = [
  { id: 'e1', nom: 'Amine', filiere: 'IAIL S5', note: 14 },
  { id: 'e2', nom: 'Sara', filiere: 'IAIL S5', note: 9 },
  { id: 'e3', nom: 'Lina', filiere: 'IAIL S5', note: 16 },
  { id: 'e4', nom: 'Youssef', filiere: 'IAIL S5', note: 11 },
];


type BadgeProps = {
  note: number;
};

function BadgeStatut({ note }: BadgeProps) {
  const admis = note >= 10;

  return (
    <View style={[styles.badge,
      admis ? styles.badgeAdmis : styles.badgeAjourne]}>
      <Text style={styles.texteBadge}>
        {admis ? 'Admis' : 'Ajourné'}
      </Text>
    </View>
  );
}

type CarteProps = {
  etudiant: Etudiant;
};
function CarteEtudiant({ etudiant }: CarteProps) {
  const { nom, filiere, note } = etudiant;

  return (
    <View style={styles.carte}>
      <View style={styles.enteteCarte}>
        <Text style={styles.nom}>{nom}</Text>
        <BadgeStatut note={note} />
      </View>

      <Text style={styles.information}>Filière : {filiere}</Text>
      <Text style={styles.information}>Note : {note}/20</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingHorizontal: 18,
    paddingBottom: 30,
    backgroundColor: '#F2F7FD',
    flexGrow: 1,
  },

  carte: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
  },

  enteteCarte: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  nom: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00235C',
  },
 
  information: {
  fontSize: 14,
  marginTop: 6,
},

badge: {
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
},

badgeAdmis: {
  backgroundColor: '#D1FAE5',
},

badgeAjourne: {
  backgroundColor: '#FEE2E2',
},

texteBadge: {
  fontWeight: 'bold',
},

titre: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#00235C',
  marginBottom: 8,
},

sousTitre: {
  fontSize: 16,
  color: '#555555',
  marginBottom: 20,
},

resume: {
  backgroundColor: '#FFFFFF',
  padding: 16,
  borderRadius: 12,
  marginBottom: 16,
},
});

const nombreAdmis = etudiants.filter(e => e.note >= 10).length;
const total = etudiants.reduce((somme, e) => somme + e.note, 0);
const moyenne = (total / etudiants.length).toFixed(1).replace('.', ',');


export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.titre}>CampusCards</Text>

      <Text style={styles.sousTitre}>
        Liste des étudiants
      </Text>

      <View style={styles.resume}>
        <Text style={styles.information}>
          Étudiants admis : {nombreAdmis}/{etudiants.length}
        </Text>

        <Text style={styles.information}>
          Moyenne générale : {moyenne}/20
        </Text>
      </View>

      {etudiants.map(etudiant => (
        <CarteEtudiant
          key={etudiant.id}
          etudiant={etudiant}
        />
      ))}
    </ScrollView>
  );
}