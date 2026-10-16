<?php
/**
 * SAFI Early Access - Admin API Endpoint
 * Handles fetching, filtering, stats, export, status updates, and deletions
 * Database: u913128959_early / safi_early
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Key");

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Handle preflight OPTIONS
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

// Detect active table name (safi_early_access or early_access)
$tableName = 'safi_early_access';
try {
    $testStmt = $pdo->query("SHOW TABLES LIKE 'safi_early_access'");
    if (!$testStmt->fetch()) {
        $testStmt2 = $pdo->query("SHOW TABLES LIKE 'early_access'");
        if ($testStmt2->fetch()) {
            $tableName = 'early_access';
        }
    }
} catch (Exception $e) {
    // Keep default
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// 1. EXPORT HANDLERS (EXCEL & CSV)
// -----------------------------------------------------------------------------
if ($requestMethod === 'GET' && isset($_GET['export'])) {
    $exportType = strtolower(trim($_GET['export']));

    if (in_array($exportType, ['excel', 'xls', 'xlsx', 'csv'], true)) {
        try {
            $search = trim($_GET['search'] ?? '');
            $bankFilter = trim($_GET['bank'] ?? '');
            $sourceFilter = trim($_GET['source'] ?? '');
            $statusFilter = trim($_GET['status'] ?? '');

            $whereClauses = [];
            $params = [];

            if ($search !== '') {
                $whereClauses[] = "(full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR bank LIKE ?)";
                $term = "%{$search}%";
                $params[] = $term;
                $params[] = $term;
                $params[] = $term;
                $params[] = $term;
            }

            if ($bankFilter !== '' && $bankFilter !== 'all') {
                $whereClauses[] = "bank = ?";
                $params[] = $bankFilter;
            }

            if ($sourceFilter !== '' && $sourceFilter !== 'all') {
                $whereClauses[] = "source = ?";
                $params[] = $sourceFilter;
            }

            if ($statusFilter !== '' && $statusFilter !== 'all') {
                $whereClauses[] = "status = ?";
                $params[] = $statusFilter;
            }

            $whereSql = !empty($whereClauses) ? 'WHERE ' . implode(' AND ', $whereClauses) : '';
            $sql = "SELECT id, full_name, email, phone, bank, bank_interest, nda_agreed, consent_contact, source, status, ip_address, created_at 
                    FROM `{$tableName}` 
                    {$whereSql} 
                    ORDER BY id DESC";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // -----------------------------------------------------------------
            // A. EXCEL SPREADSHEET (.xls SpreadsheetML)
            // -----------------------------------------------------------------
            if (in_array($exportType, ['excel', 'xls', 'xlsx'], true)) {
                $filename = 'safi_subscribers_' . date('Y-m-d_His') . '.xls';

                header('Content-Type: application/vnd.ms-excel; charset=utf-8');
                header('Content-Disposition: attachment; filename="' . $filename . '"');
                header('Pragma: no-cache');
                header('Expires: 0');

                $xmlEscape = function($val) {
                    return htmlspecialchars((string)($val ?? ''), ENT_XML1 | ENT_QUOTES, 'UTF-8');
                };

                echo '<?xml version="1.0" encoding="UTF-8"?>' . "\r\n";
                echo '<?mso-application progid="Excel.Sheet"?>' . "\r\n";
                ?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="Segoe UI" ss:Size="10" ss:Color="#0F172A"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="TitleStyle">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Font ss:FontName="Segoe UI" ss:Size="16" ss:Bold="1" ss:Color="#06241B"/>
  </Style>
  <Style ss:ID="SubtitleStyle">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Font ss:FontName="Segoe UI" ss:Size="9" ss:Italic="1" ss:Color="#64748B"/>
  </Style>
  <Style ss:ID="HeaderStyle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#C29853"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#041a13"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#041a13"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#041a13"/>
   </Borders>
   <Font ss:FontName="Segoe UI" ss:Size="10" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#06241B" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="RowEven">
   <Alignment ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Color="#0F172A"/>
   <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="RowOdd">
   <Alignment ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Color="#0F172A"/>
   <Interior ss:Color="#F8FAFC" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="CenterStyle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Segoe UI" ss:Size="9.5"/>
  </Style>
  <Style ss:ID="PhoneStyle">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Segoe UI" ss:Size="9.5"/>
   <NumberFormat ss:Format="@"/>
  </Style>
  <Style ss:ID="StatusPending">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Bold="1" ss:Color="#C29853"/>
   <Interior ss:Color="#FEF8EE" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="StatusContacted">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Bold="1" ss:Color="#2563EB"/>
   <Interior ss:Color="#EFF6FF" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="StatusApproved">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Bold="1" ss:Color="#059669"/>
   <Interior ss:Color="#ECFDF5" ss:Pattern="Solid"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="SAFI Early Access Subscribers">
  <Table ss:DefaultRowHeight="20">
   <Column ss:Width="45"/>
   <Column ss:Width="160"/>
   <Column ss:Width="210"/>
   <Column ss:Width="130"/>
   <Column ss:Width="160"/>
   <Column ss:Width="150"/>
   <Column ss:Width="100"/>
   <Column ss:Width="110"/>
   <Column ss:Width="140"/>

   <!-- Branding Header Row -->
   <Row ss:Height="30">
    <Cell ss:MergeAcross="8" ss:StyleID="TitleStyle">
     <Data ss:Type="String">VALERIS TECH • SAFI Early Access Subscriber Registry</Data>
    </Cell>
   </Row>
   <Row ss:Height="18">
    <Cell ss:MergeAcross="8" ss:StyleID="SubtitleStyle">
     <Data ss:Type="String">Export generated on <?php echo date('F j, Y, g:i a'); ?> • Total Records: <?php echo count($rows); ?></Data>
    </Cell>
   </Row>
   <Row ss:Height="10"></Row>

   <!-- Column Headers -->
   <Row ss:Height="26">
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">ID</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Full Name</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Email Address</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Phone Number</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Commercial Bank</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Bank Interest</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">NDA Agreed</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Consent</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Referral Source</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Status</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">IP Address</Data></Cell>
    <Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">Registration Date</Data></Cell>
   </Row>

   <!-- Data Rows -->
   <?php
   $i = 0;
   foreach ($rows as $r):
       $i++;
       $baseStyle = ($i % 2 === 0) ? 'RowEven' : 'RowOdd';
       $status = strtolower($r['status'] ?: 'pending');
       $statusStyle = 'StatusPending';
       if ($status === 'contacted') $statusStyle = 'StatusContacted';
       elseif ($status === 'approved' || $status === 'onboarded') $statusStyle = 'StatusApproved';
   ?>
   <Row ss:Height="22">
    <Cell ss:StyleID="CenterStyle"><Data ss:Type="Number"><?php echo (int)$r['id']; ?></Data></Cell>
    <Cell ss:StyleID="<?php echo $baseStyle; ?>"><Data ss:Type="String"><?php echo $xmlEscape($r['full_name']); ?></Data></Cell>
    <Cell ss:StyleID="<?php echo $baseStyle; ?>"><Data ss:Type="String"><?php echo $xmlEscape($r['email']); ?></Data></Cell>
    <Cell ss:StyleID="PhoneStyle"><Data ss:Type="String"><?php echo $xmlEscape($r['phone'] ?: 'N/A'); ?></Data></Cell>
    <Cell ss:StyleID="<?php echo $baseStyle; ?>"><Data ss:Type="String"><?php echo $xmlEscape($r['bank'] ?: 'Not Specified'); ?></Data></Cell>
    <Cell ss:StyleID="<?php echo $baseStyle; ?>"><Data ss:Type="String"><?php echo $xmlEscape($r['bank_interest'] ?? 'Yes, I would be interested.'); ?></Data></Cell>
    <Cell ss:StyleID="<?php echo $baseStyle; ?>"><Data ss:Type="String"><?php echo $xmlEscape($r['nda_agreed'] ?? 'I agree.'); ?></Data></Cell>
    <Cell ss:StyleID="<?php echo $baseStyle; ?>"><Data ss:Type="String"><?php echo $xmlEscape($r['consent_contact'] ?? 'Yes'); ?></Data></Cell>
    <Cell ss:StyleID="<?php echo $baseStyle; ?>"><Data ss:Type="String"><?php echo $xmlEscape($r['source'] ?: 'Direct'); ?></Data></Cell>
    <Cell ss:StyleID="<?php echo $statusStyle; ?>"><Data ss:Type="String"><?php echo $xmlEscape(ucfirst($status)); ?></Data></Cell>
    <Cell ss:StyleID="CenterStyle"><Data ss:Type="String"><?php echo $xmlEscape($r['ip_address'] ?: 'N/A'); ?></Data></Cell>
    <Cell ss:StyleID="CenterStyle"><Data ss:Type="String"><?php echo $xmlEscape($r['created_at']); ?></Data></Cell>
   </Row>
   <?php endforeach; ?>
  </Table>
 </Worksheet>
</Workbook>
<?php
                exit;
            }

            // -----------------------------------------------------------------
            // B. CSV EXPORT
            // -----------------------------------------------------------------
            if ($exportType === 'csv') {
                $filename = 'safi_subscribers_' . date('Y-m-d_His') . '.csv';

                header('Content-Type: text/csv; charset=utf-8');
                header('Content-Disposition: attachment; filename="' . $filename . '"');
                header('Pragma: no-cache');
                header('Expires: 0');

                $out = fopen('php://output', 'w');
                // UTF-8 BOM for Excel compatibility
                fprintf($out, chr(0xEF).chr(0xBB).chr(0xBF));

                // Header Row
                fputcsv($out, ['ID', 'Full Name', 'Email Address', 'Phone Number', 'Commercial Bank', 'Bank Interest', 'NDA Agreed', 'Consent', 'Referral Source', 'Registration Date']);

                foreach ($rows as $r) {
                    fputcsv($out, [
                        $r['id'],
                        $r['full_name'],
                        $r['email'],
                        $r['phone'] ?: 'N/A',
                        $r['bank'] ?: 'Not Specified',
                        $r['bank_interest'] ?? 'Yes, I would be interested.',
                        $r['nda_agreed'] ?? 'I agree.',
                        $r['consent_contact'] ?? 'Yes',
                        $r['source'] ?: 'Direct',
                        $r['created_at']
                    ]);
                }

                fclose($out);
                exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['success' => false, 'message' => 'Export failed: ' . $e->getMessage()]);
            exit;
        }
    }
}

// -----------------------------------------------------------------------------
// 2. GET: FETCH RECORDS & SUMMARY STATISTICS
// -----------------------------------------------------------------------------
if ($requestMethod === 'GET') {
    header('Content-Type: application/json; charset=utf-8');

    $search = trim($_GET['search'] ?? '');
    $bankFilter = trim($_GET['bank'] ?? '');
    $sourceFilter = trim($_GET['source'] ?? '');
    $statusFilter = trim($_GET['status'] ?? '');
    $limit = max(1, min(1000, (int)($_GET['limit'] ?? 500)));
    $offset = max(0, (int)($_GET['offset'] ?? 0));

    try {
        // Build query with optional filters
        $whereClauses = [];
        $params = [];

        if ($search !== '') {
            $whereClauses[] = "(full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR bank LIKE ?)";
            $term = "%{$search}%";
            $params[] = $term;
            $params[] = $term;
            $params[] = $term;
            $params[] = $term;
        }

        if ($bankFilter !== '' && $bankFilter !== 'all') {
            $whereClauses[] = "bank = ?";
            $params[] = $bankFilter;
        }

        if ($sourceFilter !== '' && $sourceFilter !== 'all') {
            $whereClauses[] = "source = ?";
            $params[] = $sourceFilter;
        }

        if ($statusFilter !== '' && $statusFilter !== 'all') {
            $whereClauses[] = "status = ?";
            $params[] = $statusFilter;
        }

        $whereSql = !empty($whereClauses) ? 'WHERE ' . implode(' AND ', $whereClauses) : '';

        // Query filtered records
        $sql = "SELECT id, full_name, email, phone, bank, bank_interest, nda_agreed, consent_contact, source, status, ip_address, created_at, updated_at 
                FROM `{$tableName}` 
                {$whereSql} 
                ORDER BY id DESC 
                LIMIT {$limit} OFFSET {$offset}";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Compute overall and breakdown statistics
        $totalStmt = $pdo->query("SELECT COUNT(*) FROM `{$tableName}`");
        $totalCount = (int)$totalStmt->fetchColumn();

        $todayStmt = $pdo->query("SELECT COUNT(*) FROM `{$tableName}` WHERE DATE(created_at) = CURDATE()");
        $todayCount = (int)$todayStmt->fetchColumn();

        // Bank distribution breakdown
        $bankStmt = $pdo->query("SELECT COALESCE(NULLIF(bank, ''), 'Not Specified') AS bank_name, COUNT(*) AS cnt 
                                 FROM `{$tableName}` 
                                 GROUP BY bank_name 
                                 ORDER BY cnt DESC");
        $banksBreakdown = $bankStmt->fetchAll(PDO::FETCH_KEY_PAIR);

        // Referral source breakdown
        $sourceStmt = $pdo->query("SELECT COALESCE(NULLIF(source, ''), 'Direct / Unspecified') AS source_name, COUNT(*) AS cnt 
                                   FROM `{$tableName}` 
                                   GROUP BY source_name 
                                   ORDER BY cnt DESC");
        $sourcesBreakdown = $sourceStmt->fetchAll(PDO::FETCH_KEY_PAIR);

        // Status breakdown
        $statusStmt = $pdo->query("SELECT COALESCE(NULLIF(status, ''), 'pending') AS status_name, COUNT(*) AS cnt 
                                   FROM `{$tableName}` 
                                   GROUP BY status_name");
        $statusBreakdown = $statusStmt->fetchAll(PDO::FETCH_KEY_PAIR);

        $topBank = !empty($banksBreakdown) ? array_key_first($banksBreakdown) : 'None yet';
        $topSource = !empty($sourcesBreakdown) ? array_key_first($sourcesBreakdown) : 'None yet';

        echo json_encode([
            'success' => true,
            'table' => $tableName,
            'stats' => [
                'total' => $totalCount,
                'filtered' => count($records),
                'today' => $todayCount,
                'unique_banks' => count($banksBreakdown),
                'top_bank' => $topBank,
                'top_source' => $topSource,
                'banks_breakdown' => $banksBreakdown,
                'sources_breakdown' => $sourcesBreakdown,
                'status_breakdown' => $statusBreakdown,
            ],
            'records' => $records,
            'generated_at' => date('c')
        ]);
        exit;

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to retrieve early access records: ' . $e->getMessage()
        ]);
        exit;
    }
}

// -----------------------------------------------------------------------------
// 3. PATCH / POST: UPDATE RECORD STATUS
// -----------------------------------------------------------------------------
if ($requestMethod === 'PATCH' || ($requestMethod === 'POST' && isset($_GET['action']) && $_GET['action'] === 'update_status')) {
    header('Content-Type: application/json; charset=utf-8');

    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true) ?: $_POST;

    $id = (int)($payload['id'] ?? $_GET['id'] ?? 0);
    $status = trim($payload['status'] ?? '');

    $allowedStatuses = ['pending', 'contacted', 'approved', 'archived'];

    if ($id <= 0 || !in_array($status, $allowedStatuses, true)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid ID or status. Allowed: ' . implode(', ', $allowedStatuses)
        ]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE `{$tableName}` SET status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->execute([$status, $id]);

        echo json_encode([
            'success' => true,
            'message' => "Lead #{$id} status updated to '{$status}'.",
            'id' => $id,
            'status' => $status
        ]);
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Update failed: ' . $e->getMessage()]);
        exit;
    }
}

// -----------------------------------------------------------------------------
// 4. DELETE: REMOVE A LEAD RECORD
// -----------------------------------------------------------------------------
if ($requestMethod === 'DELETE' || ($requestMethod === 'POST' && isset($_GET['action']) && $_GET['action'] === 'delete')) {
    header('Content-Type: application/json; charset=utf-8');

    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        $raw = file_get_contents('php://input');
        $payload = json_decode($raw, true);
        $id = (int)($payload['id'] ?? 0);
    }

    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Valid record ID is required for deletion.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM `{$tableName}` WHERE id = ?");
        $stmt->execute([$id]);

        // Also clean up from companion table if exists
        try {
            $pdo->prepare("DELETE FROM early_access WHERE id = ?")->execute([$id]);
        } catch (Exception $e) {}

        echo json_encode([
            'success' => true,
            'message' => "Lead #{$id} deleted successfully.",
            'id' => $id
        ]);
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Deletion failed: ' . $e->getMessage()]);
        exit;
    }
}

// Fallback method not allowed
http_response_code(405);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
