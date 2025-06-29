
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Calendar, Users } from 'lucide-react';

export const BuildingInfo = () => {
  return (
    <div className="absolute bottom-6 left-6 right-6 z-10">
      <Card className="bg-black/80 backdrop-blur-sm border-gray-700 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-6 w-6 text-blue-400" />
            Modern Commercial Complex
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Downtown District</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Completion: 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Capacity: 500+ people</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-600/30">
              Commercial
            </Badge>
            <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-600/30">
              LEED Certified
            </Badge>
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-600/30">
              Smart Building
            </Badge>
          </div>
          <p className="text-sm text-gray-300 mt-3 leading-relaxed">
            A state-of-the-art commercial building featuring modern architecture, 
            sustainable design, and cutting-edge technology integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
